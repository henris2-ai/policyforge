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

  if (!data.documents || !Array.isArray(data.documents)) {
    return {
      valid: false,
      error: "Documents must be an array of document types to generate.",
    };
  }

  if (data.documents.length === 0) {
    return {
      valid: false,
      error: "At least one document type must be selected.",
    };
  }

  const validDocumentTypes = Object.keys(DOCUMENT_GENERATORS);
  const invalidTypes = (data.documents as string[]).filter(
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
    documents: data.documents as string[],
    dataCollected: Array.isArray(data.dataCollected) ? data.dataCollected : [],
    collectionMethods: Array.isArray(data.collectionMethods)
      ? data.collectionMethods
      : [],
    sharesWithThirdParties: Boolean(data.sharesWithThirdParties),
    analytics: typeof data.analytics === "string" ? data.analytics : "none",
    sendsMarketingEmails: Boolean(data.sendsMarketingEmails),
    childrenUnder13: Boolean(data.childrenUnder13),
    hasUserAccounts: Boolean(data.hasUserAccounts),
    sellsProducts: Boolean(data.sellsProducts),
    hasUserContent: Boolean(data.hasUserContent),
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
