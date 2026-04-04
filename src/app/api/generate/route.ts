import {
  type FormData,
  generatePrivacyPolicy,
  generateTermsOfService,
  generateCookiePolicy,
  generateDisclaimer,
  generateRefundPolicy,
} from "@/lib/templates";

interface GeneratedDocuments {
  privacyPolicy?: string;
  termsOfService?: string;
  cookiePolicy?: string;
  disclaimer?: string;
  refundPolicy?: string;
}

const DOCUMENT_GENERATORS: Record<
  string,
  { key: keyof GeneratedDocuments; generator: (data: FormData) => string }
> = {
  privacyPolicy: { key: "privacyPolicy", generator: generatePrivacyPolicy },
  termsOfService: {
    key: "termsOfService",
    generator: generateTermsOfService,
  },
  cookiePolicy: { key: "cookiePolicy", generator: generateCookiePolicy },
  disclaimer: { key: "disclaimer", generator: generateDisclaimer },
  refundPolicy: { key: "refundPolicy", generator: generateRefundPolicy },
};

function validateInput(
  body: unknown
): { valid: true; data: FormData } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object." };
  }

  const data = body as Record<string, unknown>;

  if (!data.businessName || typeof data.businessName !== "string") {
    return {
      valid: false,
      error: "Business name is required and must be a string.",
    };
  }

  if (data.businessName.trim().length === 0) {
    return { valid: false, error: "Business name cannot be empty." };
  }

  if (!data.websiteUrl || typeof data.websiteUrl !== "string") {
    return {
      valid: false,
      error: "Website URL is required and must be a string.",
    };
  }

  if (data.websiteUrl.trim().length === 0) {
    return { valid: false, error: "Website URL cannot be empty." };
  }

  // Basic URL validation
  try {
    new URL(data.websiteUrl as string);
  } catch {
    return {
      valid: false,
      error:
        "Website URL must be a valid URL (e.g., https://example.com).",
    };
  }

  // Accept documents as either an array of strings or an object of booleans
  let documentsArray: string[];
  if (Array.isArray(data.documents)) {
    documentsArray = data.documents;
  } else if (data.documents && typeof data.documents === "object") {
    // Convert { privacyPolicy: true, termsOfService: false, ... } to ["privacyPolicy"]
    documentsArray = Object.entries(data.documents as Record<string, boolean>)
      .filter(([, v]) => v === true)
      .map(([k]) => k);
  } else {
    return {
      valid: false,
      error: "Documents must be an array of document types or an object.",
    };
  }

  if (documentsArray.length === 0) {
    return {
      valid: false,
      error: "At least one document type must be selected.",
    };
  }

  // Replace data.documents with the normalized array for downstream use
  data.documents = documentsArray;

  const validDocumentTypes = Object.keys(DOCUMENT_GENERATORS);
  const invalidTypes = (documentsArray as string[]).filter(
    (doc) => !validDocumentTypes.includes(doc)
  );
  if (invalidTypes.length > 0) {
    return {
      valid: false,
      error: `Invalid document type(s): ${invalidTypes.join(", ")}. Valid types are: ${validDocumentTypes.join(", ")}.`,
    };
  }

  // Build the FormData with defaults for optional fields
  const formData: FormData = {
    businessName: (data.businessName as string).trim(),
    websiteUrl: (data.websiteUrl as string).trim(),
    businessType: typeof data.businessType === "string" ? data.businessType : "general",
    country: typeof data.country === "string" ? data.country : "US",
    documents: documentsArray,
    dataCollected: Array.isArray(data.dataCollected) ? data.dataCollected : [],
    collectionMethods: Array.isArray(data.collectionMethods)
      ? data.collectionMethods
      : [],
    sharesWithThirdParties: data.sharesWithThirdParties === "yes" || data.sharesWithThirdParties === true,
    analytics: typeof data.analytics === "string" ? data.analytics : "none",
    sendsMarketingEmails: data.sendsMarketingEmails === "yes" || data.marketingEmails === "yes" || data.sendsMarketingEmails === true,
    childrenUnder13: data.childrenUnder13 === "yes" || data.childrenUnder13 === true,
    hasUserAccounts: data.hasUserAccounts === "yes" || data.userAccounts === "yes" || data.hasUserAccounts === true,
    sellsProducts: data.sellsProducts === "yes" || data.sellsProducts === true,
    hasUserContent: data.hasUserContent === "yes" || data.userGeneratedContent === "yes" || data.hasUserContent === true,
    jurisdiction: typeof data.jurisdiction === "string" ? data.jurisdiction : "US",
  };

  return { valid: true, data: formData };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateInput(body);

    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const { data } = validation;
    const documents: GeneratedDocuments = {};

    for (const docType of data.documents) {
      const entry = DOCUMENT_GENERATORS[docType];
      if (entry) {
        documents[entry.key] = entry.generator(data);
      }
    }

    return Response.json({ documents });
  } catch (error) {
    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    console.error("Document generation error:", error);
    return Response.json(
      { error: "An internal error occurred while generating documents." },
      { status: 500 }
    );
  }
}
