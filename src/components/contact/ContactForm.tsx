"use client";

import { FormEvent, useEffect, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import { useTranslations } from "next-intl";
import { usePersistedState } from "@/hooks/usePersistedState";

export default function ContactForm() {
  const t = useTranslations("contact.form");

  const [name, setName] = usePersistedState("formName", "");
  const [email, setEmail] = usePersistedState("formEmail", "");
  const [message, setMessage] = usePersistedState("formMessage", "");
  const [emailValid, setEmailValid] = useState(false);

  const [nameUnfocused, setNameUnfocused] = useState(false);
  const [emailUnfocused, setEmailUnfocused] = useState(false);
  const [messageUnfocused, setMessageUnfocused] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState(false);

  useEffect(() => {
    setEmailValid(validEmail());
  }, [email]);

  function validEmail() {
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
  }

  function validForm() {
    return !!name && emailValid && !!message;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validForm()) {
      // So they can get red outline
      setNameUnfocused(true);
      setEmailUnfocused(true);
      setMessageUnfocused(true);

      setDescriptionStatus(false);
      setDescription(t("invalidForm"));
      return;
    }

    const domain =
      process.env.NODE_ENV === "production"
        ? "https://api.rutgerpronk.com"
        : "http://api.localhost";

    const respone = await fetch(`${domain}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderName: name,
        senderEmail: email,
        message: message,
      }),
    });

    if (respone.ok) {
      setDescription(t("success"));
      setDescriptionStatus(true);
    } else {
      setDescription(t("error"));
      setDescriptionStatus(false);
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-y-7 rounded-md bg-secondary p-8 xs:max-w-[380px]"
      onSubmit={onSubmit}
    >
      <h3 className="text-2xl text-textPrimary">{t("title")}</h3>
      <input
        className={`${
          !name && nameUnfocused ? "outline-red" : "focus:outline-accent"
        } outline-n w-full rounded-sm bg-primary px-3 py-2 text-textPrimary outline-none outline-1`}
        type="text"
        placeholder={t("name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setNameUnfocused(false)}
        onBlur={() => setNameUnfocused(true)}
      />

      <input
        className={`${
          !emailValid && emailUnfocused ? "outline-red" : "focus:outline-accent"
        } w-full rounded-sm bg-primary px-3 py-2 text-textPrimary outline-none outline-1`}
        type="text"
        placeholder={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setEmailUnfocused(false)}
        onBlur={() => setEmailUnfocused(true)}
      />
      <textarea
        className={`${
          !message && messageUnfocused ? "outline-red" : "focus:outline-accent"
        } min-h-[150px] w-full rounded-sm bg-primary px-3 py-2 text-textPrimary outline-none outline-1`}
        placeholder={t("message")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setMessageUnfocused(false)}
        onBlur={() => setMessageUnfocused(true)}
      ></textarea>

      <AnimatedButton className={"w-fit"} text={t("submit")} />
      <p className={`${descriptionStatus ? "text-green" : "text-red"} `}>
        {description}
      </p>
    </form>
  );
}
