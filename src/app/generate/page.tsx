"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  /* Step 1 - Business Info */
  businessName: string;
  websiteUrl: string;
  businessType: string;
  country: string;

  /* Step 2 - Document Selection */
  documents: {
    privacyPolicy: boolean;
    termsOfService: boolean;
    cookiePolicy: boolean;
    disclaimer: boolean;
    refundPolicy: boolean;
  };

  /* Step 3 - Data Practices */
  dataCollected: string[];
  collectionMethods: string[];
  sharesWithThirdParties: string;
  analytics: string;
  marketingEmails: string;
  childrenUnder13: string;

  /* Step 4 - Additional Options (ToS) */
  userAccounts: string;
  sellsProducts: string;
  userGeneratedContent: string;
  governingLaw: string;
}

interface GeneratedDocument {
  title: string;
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BUSINESS_TYPES = [
  "E-commerce",
  "SaaS",
  "Blog/Content",
  "Mobile App",
  "Agency/Services",
  "Other",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "European Union",
  "Canada",
  "Australia",
  "Other",
];

const DATA_TYPES = [
  "Names",
  "Email addresses",
  "Phone numbers",
  "Mailing addresses",
  "Payment information",
  "IP addresses",
  "Cookies",
  "Device information",
  "Location data",
  "Social media profiles",
];

const COLLECTION_METHODS = [
  "Contact forms",
  "User registration",
  "Purchases",
  "Analytics tools",
  "Cookies",
  "Third-party services",
];

const ANALYTICS_OPTIONS = [
  "Google Analytics",
  "Plausible",
  "None",
  "Other",
];

const DOCUMENT_OPTIONS: {
  key: keyof FormData["documents"];
  label: string;
  paid: boolean;
}[] = [
  { key: "privacyPolicy", label: "Privacy Policy", paid: false },
  { key: "termsOfService", label: "Terms of Service", paid: true },
  { key: "cookiePolicy", label: "Cookie Policy", paid: true },
  { key: "disclaimer", label: "Disclaimer", paid: true },
  { key: "refundPolicy", label: "Refund Policy", paid: true },
];

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialFormData: FormData = {
  businessName: "",
  websiteUrl: "",
  businessType: "",
  country: "",

  documents: {
    privacyPolicy: true,
    termsOfService: false,
    cookiePolicy: false,
    disclaimer: false,
    refundPolicy: false,
  },

  dataCollected: [],
  collectionMethods: [],
  sharesWithThirdParties: "no",
  analytics: "None",
  marketingEmails: "no",
  childrenUnder13: "no",

  userAccounts: "no",
  sellsProducts: "no",
  userGeneratedContent: "no",
  governingLaw: "",
};

/* ------------------------------------------------------------------ */
/*  Step metadata                                                      */
/* ------------------------------------------------------------------ */

const ALL_STEPS = [
  { id: 1, title: "Business Info" },
  { id: 2, title: "Document Selection" },
  { id: 3, title: "Data Practices" },
  { id: 4, title: "Additional Options" },
  { id: 5, title: "Review & Generate" },
];

function getActiveSteps(formData: FormData) {
  const steps = [ALL_STEPS[0], ALL_STEPS[1]];

  if (formData.documents.privacyPolicy) {
    steps.push(ALL_STEPS[2]);
  }
  if (formData.documents.termsOfService) {
    steps.push(ALL_STEPS[3]);
  }
  steps.push(ALL_STEPS[4]);

  return steps;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GeneratePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocument[] | null>(null);
  const [activeDocTab, setActiveDocTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const activeSteps = getActiveSteps(formData);
  const currentStep = activeSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === activeSteps.length - 1;

  /* ---- helpers ---- */

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDocument(key: keyof FormData["documents"]) {
    if (key === "privacyPolicy") return; // always on
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: !prev.documents[key] },
    }));
  }

  function toggleArrayItem(key: "dataCollected" | "collectionMethods", item: string) {
    setFormData((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item],
      };
    });
  }

  function handleNext() {
    if (isLastStep) return;
    setCurrentStepIndex((i) => Math.min(i + 1, activeSteps.length - 1));
  }

  function handleBack() {
    if (isFirstStep) return;
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedDocs(data.documents);
      } else {
        // Fallback: generate placeholder docs client-side
        generatePlaceholder();
      }
    } catch {
      generatePlaceholder();
    } finally {
      setIsGenerating(false);
    }
  }

  function generatePlaceholder() {
    const docs: GeneratedDocument[] = [];
    if (formData.documents.privacyPolicy) {
      docs.push({
        title: "Privacy Policy",
        content: buildPrivacyPolicy(formData),
      });
    }
    if (formData.documents.termsOfService) {
      docs.push({
        title: "Terms of Service",
        content: buildTermsOfService(formData),
      });
    }
    if (formData.documents.cookiePolicy) {
      docs.push({
        title: "Cookie Policy",
        content: buildCookiePolicy(formData),
      });
    }
    if (formData.documents.disclaimer) {
      docs.push({
        title: "Disclaimer",
        content: buildDisclaimer(formData),
      });
    }
    if (formData.documents.refundPolicy) {
      docs.push({
        title: "Refund Policy",
        content: buildRefundPolicy(formData),
      });
    }
    setGeneratedDocs(docs);
    setActiveDocTab(0);
  }

  function handleCopy(text: string, title: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(title);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  }

  function handleDownload(text: string, title: string) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---- ensure step index stays in bounds when steps change ---- */
  const safeIndex = Math.min(currentStepIndex, activeSteps.length - 1);
  if (safeIndex !== currentStepIndex) {
    setCurrentStepIndex(safeIndex);
  }

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* -------- Progress Bar -------- */}
      <nav className="mb-10">
        <div className="flex items-center justify-between mb-2">
          {activeSteps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    idx < currentStepIndex
                      ? "bg-indigo-600 text-white"
                      : idx === currentStepIndex
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {idx < currentStepIndex ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium hidden sm:block ${
                    idx <= currentStepIndex ? "text-indigo-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {idx < activeSteps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 rounded ${
                    idx < currentStepIndex ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* -------- Step Content -------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Step {currentStepIndex + 1}: {currentStep.title}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {stepDescription(currentStep.id)}
        </p>

        {/* Step 1 */}
        {currentStep.id === 1 && (
          <div className="space-y-5">
            <Field label="Business / Website Name" required>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                placeholder="Acme Inc."
                className="form-input"
              />
            </Field>

            <Field label="Website URL">
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
                placeholder="https://example.com"
                className="form-input"
              />
            </Field>

            <Field label="Business Type" required>
              <select
                value={formData.businessType}
                onChange={(e) => update("businessType", e.target.value)}
                className="form-input"
              >
                <option value="">Select a type...</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Country of Operation" required>
              <select
                value={formData.country}
                onChange={(e) => update("country", e.target.value)}
                className="form-input"
              >
                <option value="">Select a country...</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {/* Step 2 */}
        {currentStep.id === 2 && (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3 text-sm text-indigo-700">
              Privacy Policy is free! Additional documents require the{" "}
              <span className="font-semibold">$19 bundle</span>.
            </div>

            {DOCUMENT_OPTIONS.map((doc) => (
              <label
                key={doc.key}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.documents[doc.key]
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${doc.key === "privacyPolicy" ? "opacity-90" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={formData.documents[doc.key]}
                  onChange={() => toggleDocument(doc.key)}
                  disabled={doc.key === "privacyPolicy"}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="flex-1 font-medium text-gray-900">{doc.label}</span>
                {doc.paid ? (
                  <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Free
                  </span>
                )}
              </label>
            ))}
          </div>
        )}

        {/* Step 3 - Data Practices */}
        {currentStep.id === 3 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="text-sm font-semibold text-gray-700 mb-2">
                What personal data do you collect?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DATA_TYPES.map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={formData.dataCollected.includes(item)}
                    onChange={() => toggleArrayItem("dataCollected", item)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-gray-700 mb-2">
                How do you collect data?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COLLECTION_METHODS.map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={formData.collectionMethods.includes(item)}
                    onChange={() => toggleArrayItem("collectionMethods", item)}
                  />
                ))}
              </div>
            </fieldset>

            <RadioGroup
              label="Do you share data with third parties?"
              value={formData.sharesWithThirdParties}
              onChange={(v) => update("sharesWithThirdParties", v)}
            />

            <Field label="Do you use analytics?">
              <select
                value={formData.analytics}
                onChange={(e) => update("analytics", e.target.value)}
                className="form-input"
              >
                {ANALYTICS_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>

            <RadioGroup
              label="Do you send marketing emails?"
              value={formData.marketingEmails}
              onChange={(v) => update("marketingEmails", v)}
            />

            <RadioGroup
              label="Do children under 13 use your service?"
              value={formData.childrenUnder13}
              onChange={(v) => update("childrenUnder13", v)}
            />
          </div>
        )}

        {/* Step 4 - Additional Options */}
        {currentStep.id === 4 && (
          <div className="space-y-6">
            <RadioGroup
              label="Do you offer user accounts?"
              value={formData.userAccounts}
              onChange={(v) => update("userAccounts", v)}
            />
            <RadioGroup
              label="Do you sell products or services?"
              value={formData.sellsProducts}
              onChange={(v) => update("sellsProducts", v)}
            />
            <RadioGroup
              label="Do you host user-generated content?"
              value={formData.userGeneratedContent}
              onChange={(v) => update("userGeneratedContent", v)}
            />
            <Field label="Governing Law Jurisdiction">
              <input
                type="text"
                value={formData.governingLaw}
                onChange={(e) => update("governingLaw", e.target.value)}
                placeholder="e.g. State of California"
                className="form-input"
              />
            </Field>
          </div>
        )}

        {/* Step 5 - Review & Generate */}
        {currentStep.id === 5 && !generatedDocs && (
          <div className="space-y-6">
            {/* Summary */}
            <SummarySection title="Business Information">
              <SummaryRow label="Name" value={formData.businessName || "---"} />
              <SummaryRow label="URL" value={formData.websiteUrl || "---"} />
              <SummaryRow label="Type" value={formData.businessType || "---"} />
              <SummaryRow label="Country" value={formData.country || "---"} />
            </SummarySection>

            <SummarySection title="Documents to Generate">
              <ul className="space-y-1">
                {DOCUMENT_OPTIONS.filter((d) => formData.documents[d.key]).map((d) => (
                  <li key={d.key} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {d.label}
                  </li>
                ))}
              </ul>
            </SummarySection>

            {formData.documents.privacyPolicy && (
              <SummarySection title="Data Practices">
                <SummaryRow label="Data collected" value={formData.dataCollected.join(", ") || "None selected"} />
                <SummaryRow label="Collection methods" value={formData.collectionMethods.join(", ") || "None selected"} />
                <SummaryRow label="Third-party sharing" value={formData.sharesWithThirdParties} />
                <SummaryRow label="Analytics" value={formData.analytics} />
                <SummaryRow label="Marketing emails" value={formData.marketingEmails} />
                <SummaryRow label="Children under 13" value={formData.childrenUnder13} />
              </SummarySection>
            )}

            {formData.documents.termsOfService && (
              <SummarySection title="Terms of Service Options">
                <SummaryRow label="User accounts" value={formData.userAccounts} />
                <SummaryRow label="Sells products" value={formData.sellsProducts} />
                <SummaryRow label="User-generated content" value={formData.userGeneratedContent} />
                <SummaryRow label="Governing law" value={formData.governingLaw || "---"} />
              </SummarySection>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Spinner />
                  Generating Documents...
                </>
              ) : (
                "Generate Documents"
              )}
            </button>
          </div>
        )}

        {/* Generated documents output */}
        {currentStep.id === 5 && generatedDocs && (
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
              {generatedDocs.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDocTab(idx)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeDocTab === idx
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {doc.title}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleDownload(
                    generatedDocs[activeDocTab].content,
                    generatedDocs[activeDocTab].title
                  )
                }
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download
              </button>
              <button
                onClick={() =>
                  handleCopy(
                    generatedDocs[activeDocTab].content,
                    generatedDocs[activeDocTab].title
                  )
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                {copySuccess === generatedDocs[activeDocTab].title ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={() => {
                  setGeneratedDocs(null);
                  setActiveDocTab(0);
                }}
                className="ml-auto px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Start Over
              </button>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {generatedDocs[activeDocTab].content}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* -------- Navigation Buttons -------- */}
      {!(currentStep.id === 5 && generatedDocs) && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          {!isLastStep && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* -------- Global Styles for form inputs -------- */}
      <style jsx global>{`
        .form-input {
          display: block;
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #111827;
          background-color: #fff;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }
        .form-input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      {label}
    </label>
  );
}

function RadioGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700 mb-2">{label}</legend>
      <div className="flex gap-6">
        {["yes", "no"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name={label}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/* ================================================================== */
/*  Step descriptions                                                  */
/* ================================================================== */

function stepDescription(id: number): string {
  switch (id) {
    case 1:
      return "Tell us about your business so we can tailor your documents.";
    case 2:
      return "Choose which legal documents you need.";
    case 3:
      return "Help us understand how you handle user data.";
    case 4:
      return "A few more details for your Terms of Service.";
    case 5:
      return "Review your selections and generate your documents.";
    default:
      return "";
  }
}

/* ================================================================== */
/*  Placeholder document builders (used when API is unavailable)       */
/* ================================================================== */

function buildPrivacyPolicy(fd: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `PRIVACY POLICY

Last updated: ${date}

${fd.businessName} ("we", "us", or "our") operates ${fd.websiteUrl || "the website"} (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.

1. INFORMATION WE COLLECT

We collect the following types of personal information:
${fd.dataCollected.map((d) => `  - ${d}`).join("\n") || "  - No specific data types selected."}

2. HOW WE COLLECT INFORMATION

We collect information through:
${fd.collectionMethods.map((m) => `  - ${m}`).join("\n") || "  - No specific methods selected."}

3. THIRD-PARTY SHARING

${fd.sharesWithThirdParties === "yes" ? "We may share your personal data with third-party service providers to facilitate our Service, provide the Service on our behalf, or assist us in analyzing how our Service is used." : "We do not share your personal data with third parties except as necessary to provide our Service."}

4. ANALYTICS

${fd.analytics !== "None" ? `We use ${fd.analytics} to monitor and analyze the use of our Service.` : "We do not currently use third-party analytics services."}

5. MARKETING COMMUNICATIONS

${fd.marketingEmails === "yes" ? "With your consent, we may send you marketing emails about our products and services. You can opt out at any time by clicking the unsubscribe link in any email." : "We do not send marketing emails unless you explicitly opt in."}

6. CHILDREN'S PRIVACY

${fd.childrenUnder13 === "yes" ? "Our Service may be used by children under the age of 13. We take additional steps to protect the privacy of children in compliance with COPPA and other applicable laws." : "Our Service is not directed to children under the age of 13. We do not knowingly collect personal data from children under 13."}

7. YOUR RIGHTS

Depending on your location, you may have the right to:
  - Access your personal data
  - Correct inaccurate data
  - Request deletion of your data
  - Object to processing of your data
  - Data portability

8. CONTACT US

If you have any questions about this Privacy Policy, please contact us at:
${fd.businessName}
${fd.websiteUrl || "[Your Website]"}

---
This document was generated by PolicyForge for ${fd.businessName}.`;
}

function buildTermsOfService(fd: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `TERMS OF SERVICE

Last updated: ${date}

Please read these Terms of Service ("Terms") carefully before using ${fd.websiteUrl || "the website"} operated by ${fd.businessName} ("we", "us", or "our").

1. ACCEPTANCE OF TERMS

By accessing or using our Service, you agree to be bound by these Terms. If you do not agree, you may not use the Service.

${fd.userAccounts === "yes" ? `2. USER ACCOUNTS

You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.` : `2. ACCESS

Access to certain features of the Service may be restricted.`}

${fd.sellsProducts === "yes" ? `3. PURCHASES & PAYMENTS

If you purchase products or services, you agree to provide accurate payment information. All sales are subject to our pricing and payment terms. We reserve the right to refuse or cancel orders at our discretion.` : `3. SERVICE USAGE

The Service is provided for informational and operational purposes.`}

${fd.userGeneratedContent === "yes" ? `4. USER-GENERATED CONTENT

You may submit content to the Service. You retain ownership of your content but grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute it in connection with the Service. You are solely responsible for your content and must not post anything unlawful or infringing.` : `4. INTELLECTUAL PROPERTY

All content on the Service is owned by or licensed to us and is protected by applicable intellectual property laws.`}

5. LIMITATION OF LIABILITY

To the maximum extent permitted by law, ${fd.businessName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.

6. TERMINATION

We may terminate or suspend your access to the Service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users or us.

7. GOVERNING LAW

${fd.governingLaw ? `These Terms shall be governed by the laws of ${fd.governingLaw}.` : "These Terms shall be governed by the laws of the jurisdiction in which the company operates."}

8. CONTACT US

If you have any questions about these Terms, please contact us at:
${fd.businessName}
${fd.websiteUrl || "[Your Website]"}

---
This document was generated by PolicyForge for ${fd.businessName}.`;
}

function buildCookiePolicy(fd: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `COOKIE POLICY

Last updated: ${date}

${fd.businessName} ("we", "us", or "our") uses cookies and similar tracking technologies on ${fd.websiteUrl || "our website"}.

1. WHAT ARE COOKIES?

Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you interact with it.

2. TYPES OF COOKIES WE USE

  - Essential Cookies: Required for the website to function properly.
  - Analytics Cookies: Help us understand how visitors use our site.${fd.analytics !== "None" ? ` We use ${fd.analytics} for this purpose.` : ""}
  - Functional Cookies: Remember your preferences and settings.
  - Marketing Cookies: Used to deliver relevant advertisements.${fd.marketingEmails === "yes" ? " We may use these in connection with email marketing." : ""}

3. MANAGING COOKIES

You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our website.

4. THIRD-PARTY COOKIES

Some cookies are placed by third-party services that appear on our pages. We do not control these cookies.

5. CONTACT US

If you have questions about our use of cookies, please contact us at:
${fd.businessName}
${fd.websiteUrl || "[Your Website]"}

---
This document was generated by PolicyForge for ${fd.businessName}.`;
}

function buildDisclaimer(fd: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `DISCLAIMER

Last updated: ${date}

The information provided by ${fd.businessName} ("we", "us", or "our") on ${fd.websiteUrl || "our website"} is for general informational purposes only.

1. NO WARRANTIES

All information on the Service is provided in good faith. We make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the Service.

2. EXTERNAL LINKS

The Service may contain links to other websites or content belonging to third parties. We do not warrant the accuracy or completeness of any third-party information.

3. PROFESSIONAL DISCLAIMER

The Service does not contain professional advice. ${fd.businessType === "Agency/Services" ? "While we provide professional services, content on this website should not be considered a substitute for direct professional consultation." : "Before taking any actions based upon information provided on this website, we encourage you to consult with appropriate professionals."}

4. LIMITATION OF LIABILITY

Under no circumstances shall ${fd.businessName} be liable for any loss or damage incurred as a result of the use of the Service or reliance on any information provided on the Service.

5. CONTACT US

If you have questions about this Disclaimer, please contact us at:
${fd.businessName}
${fd.websiteUrl || "[Your Website]"}

---
This document was generated by PolicyForge for ${fd.businessName}.`;
}

function buildRefundPolicy(fd: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `REFUND POLICY

Last updated: ${date}

Thank you for choosing ${fd.businessName}. This Refund Policy applies to ${fd.businessType === "E-commerce" ? "products purchased" : fd.businessType === "SaaS" ? "subscriptions and services purchased" : "purchases made"} through ${fd.websiteUrl || "our website"}.

1. REFUND ELIGIBILITY

${fd.businessType === "E-commerce" ? `Products may be returned within 30 days of delivery. Items must be unused and in their original packaging. Certain products (perishable goods, custom items, personal care items) may be exempt from returns.` : fd.businessType === "SaaS" ? `If you are not satisfied with our service, you may request a refund within 14 days of your initial purchase. Refunds for renewal periods are handled on a case-by-case basis.` : `Refund requests will be evaluated on a case-by-case basis. Please contact us within 30 days of your purchase to discuss your options.`}

2. HOW TO REQUEST A REFUND

To request a refund, please contact us with your order details. We will review your request and notify you of the approval or rejection within 5 business days.

3. PROCESSING

Approved refunds will be processed within 10 business days. The refund will be applied to the original payment method.

4. EXCEPTIONS

We reserve the right to refuse a refund if the terms above are not met or if we suspect fraud or abuse.

5. CONTACT US

If you have questions about this Refund Policy, please contact us at:
${fd.businessName}
${fd.websiteUrl || "[Your Website]"}

---
This document was generated by PolicyForge for ${fd.businessName}.`;
}
