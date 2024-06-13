"use client";
import ImageLoader from "@/components/ui/ImageLoader";
import { useLanguage } from "@/context/Language";
import { LANGUAGE_OPTIONS } from "@/utils/constants";
import { Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

export default function LanguageFlagButton() {
  const { language, setLanguage } = useLanguage();
  return (
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={language}
      onChange={(event) => {
        if (language !== event.target.value) {
          setLanguage(event.target.value);
        }
      }}
      className="tw-flex tw-flex-col tw-gap-2"
    >
      {LANGUAGE_OPTIONS.map((langItem) => {
        return (
          <div
            key={langItem.id}
            className={`tw-flex tw-gap-2 tw-items-center tw-p-2 tw-w-1/2 lg:tw-w-1/4 tw-rounded-md  tw-duration-200 ${
              language === langItem.id
                ? "tw-bg-gray-300"
                : "tw-cursor-pointer hover:tw-bg-gray-100"
            }`}
            onClick={() => {
              if (language !== langItem.id) {
                setLanguage(langItem.id);
              }
            }}
          >
            <Radio value={langItem.id} />
            <div className="tw-w-8 tw-h-5">
              <ImageLoader src={langItem.img} priority isFlat />
            </div>
            <Typography variant="subtitle1">{langItem.name}</Typography>
          </div>
        );
      })}
    </RadioGroup>
  );
}
