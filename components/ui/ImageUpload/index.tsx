import { Add } from "@mui/icons-material";
import React, { Fragment } from "react";
import ImageLoader from "../ImageLoader";
import ImageEditButtonProps from "@/components/features/ImageEditButton";
import { Typography } from "@mui/material";

interface ImageUploadProps {
  imageUrl?: string;
  value: string;
  width?: number;
  height?: number;
  onEdit?: boolean;
  isLoading?: boolean;
  onImageChange?: (data: File) => void | undefined;
  newImage?: File;
  onImageClear?: () => void;
  error?: boolean;
  helperText?: string;
}

const ImageUpload = ({
  value,
  height = 64,
  width = 64,
  onEdit = false,
  onImageChange = () => {},
  imageUrl,
  newImage,
  error = false,
  helperText = "",
  onImageClear = () => {},
}: ImageUploadProps) => {
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange?.(file);
    }
  };

  return (
    <Fragment>
      <div
        className={`tw-w-40 tw-h-40 tw-rounded-md tw-overflow-hidden tw-relative ${
          !imageUrl
            ? "tw-bg-gray-400 tw-rounded-md tw-group tw-cursor-pointer tw-overflow-hidden"
            : ""
        } ${error ? "tw-outline tw-outline-[1px] tw-outline-danger-500" : ""}`}
      >
        {!imageUrl && (
          <Fragment>
            <label
              htmlFor="avatar"
              className="tw-cursor-pointer tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-p-2"
            >
              <div className="tw-w-full tw-h-full tw-border-dashed tw-border-4 tw-flex tw-items-center tw-justify-center tw-border-gray-500 tw-rounded-md group-hover:tw-border-gray-600 tw-duration-200">
                <Add
                  fontSize="large"
                  className="tw-text-gray-500  group-hover:tw-text-gray-600 tw-duration-200"
                />
              </div>
            </label>
          </Fragment>
        )}
        {imageUrl && (
          <Fragment>
            <ImageLoader
              alt="item-img"
              className="tw-object-cover"
              src={imageUrl}
              priority
              isFlat
            />
            {onEdit ? (
              <Fragment>
                {!newImage ? (
                  <label htmlFor="avatar">
                    <ImageEditButtonProps
                      onClick={onImageClear}
                      type={!newImage && onEdit ? "edit" : "delete"}
                    />
                  </label>
                ) : (
                  <ImageEditButtonProps onClick={onImageClear} />
                )}
              </Fragment>
            ) : (
              <ImageEditButtonProps onClick={onImageClear} />
            )}
          </Fragment>
        )}
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={handleFileInputChange}
          hidden
        />
      </div>
      {error && (
        <Typography variant="helperText" className="tw-text-danger tw-mx-0">
          {helperText}
        </Typography>
      )}
    </Fragment>
  );
};

export default ImageUpload;
