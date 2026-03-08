"use client";

import { useState } from "react";

interface FormValues {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {

  const [formData, setFormData] = useState<FormValues>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // quick validation before submit
  function validateForm(): FormErrors {

    const errors: FormErrors = {};

    const name = formData.fullName.trim();
    const subject = formData.subject.trim();
    const msg = formData.message.trim();

    if (name.length < 3) {
      errors.fullName = "Full name must be at least 3 characters.";
    }

    if (subject.length < 3) {
      errors.subject = "Subject must be at least 3 characters.";
    }

    // simple email regex (not perfect but good enough for now)
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    if (!emailValid) {
      errors.email = "Please enter a valid email address.";
    }

    if (msg.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));

  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    const validation = validateForm();
    setFormErrors(validation);

    const hasErrors = Object.keys(validation).length > 0;

    if (!hasErrors) {

      setWasSubmitted(true);

      // reset form after successful submit
      setFormData({
        fullName: "",
        subject: "",
        email: "",
        message: "",
      });

    } else {
      setWasSubmitted(false);
    }
  }

  const pageTitle = "Contact"; // pulled out just in case

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">

      <h1 className="mb-8 text-3xl font-semibold">{pageTitle}</h1>

      {wasSubmitted && (
        <div className="mb-6 border border-green-300 bg-green-50 p-4 text-sm text-green-700">
          Your message has been sent successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border border-neutral-300 p-6"
      >

        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 px-3 py-2 outline-none"
          />

          {formErrors.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {formErrors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 px-3 py-2 outline-none"
          />

          {formErrors.subject && (
            <p className="mt-2 text-sm text-red-600">
              {formErrors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-neutral-300 px-3 py-2 outline-none"
          />

          {formErrors.email && (
            <p className="mt-2 text-sm text-red-600">
              {formErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="w-full border border-neutral-300 px-3 py-2 outline-none"
          />

          {formErrors.message && (
            <p className="mt-2 text-sm text-red-600">
              {formErrors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="border border-black px-5 py-2 text-sm transition hover:bg-black hover:text-white"
        >
          Send Message
        </button>

      </form>
    </main>
  );
}