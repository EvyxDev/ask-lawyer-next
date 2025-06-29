import { FieldErrors } from "react-hook-form";
import { MdOutlineCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { RegisterLawyerSchemaType } from "@/lib/schemes/types/authSchema";
import { useTranslations } from "next-intl";

interface ImageUploadFormProps {
  errors: FieldErrors<RegisterLawyerSchemaType>;
  imagePreviews: {
    img: string | null;
    photo_union_card: string | null;
    photo_office_rent: string | null;
    card_id_img: string | null;
    photo_passport: string | null;
  };
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegisterLawyerSchemaType
  ) => void;
  handleRemoveImage: (field: keyof RegisterLawyerSchemaType) => void;
  handleBack: () => void;
  handleNext: () => void;
}

const ImageUploadForm = ({
  errors,
  imagePreviews,
  handleFileChange,
  handleRemoveImage,
  handleBack,
  handleNext,
}: ImageUploadFormProps) => {
  const t = useTranslations("register");
  return (
    <>
      <p className="text-primary font-semibold text-lg">{t("images")}</p>
      <div>
        <label className="block text-end text-lg font-semibold text-gray-700 mb-2">
          {t("labels.profile")}
        </label>
        <div className="flex justify-center">
          {!imagePreviews.img && (
            <label
              htmlFor="img"
              className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center max-w-lg h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <MdOutlineCloudUpload className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm text-gray-500">اضغط لرفع صورة</span>
              <input
                id="img"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "img")}
              />
            </label>
          )}
          {imagePreviews.img && (
            <div className="relative mt-2 w-full max-w-md">
              <Image
                src={imagePreviews.img}
                alt="Image 1 Preview"
                width={128}
                height={128}
                className="w-full max-w-lg h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("img")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
              >
                <AiOutlineClose className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {errors.img && (
          <p className="text-red-500 text-sm mt-2">
            {typeof errors.img?.message === "string"
              ? errors.img.message
              : null}
          </p>
        )}
      </div>
      <div>
        <label className="block text-end text-lg font-semibold text-gray-700 mb-2">
          {t("labels.unionIdPhoto")}
        </label>
        <div className="flex justify-center">
          {!imagePreviews.photo_union_card && (
            <label
              htmlFor="photo_union_card"
              className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center max-w-lg h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <MdOutlineCloudUpload className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm text-gray-500">اضغط لرفع صورة</span>
              <input
                id="photo_union_card"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo_union_card")}
              />
            </label>
          )}
          {imagePreviews.photo_union_card && (
            <div className="relative mt-2 w-full max-w-md">
              <Image
                src={imagePreviews.photo_union_card}
                alt="Image 1 Preview"
                width={128}
                height={128}
                className="w-full max-w-lg h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("photo_union_card")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
              >
                <AiOutlineClose className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {errors.photo_union_card && (
          <p className="text-red-500 text-sm mt-2">
            {typeof errors.photo_union_card?.message === "string"
              ? errors.photo_union_card.message
              : null}
          </p>
        )}
      </div>
      <div>
        <label className="block text-end text-lg font-semibold text-gray-700 mb-2">
          {t("labels.photo_office_rent")}
        </label>
        <div className="flex justify-center">
          {!imagePreviews.photo_office_rent && (
            <label
              htmlFor="photo_office_rent"
              className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center max-w-lg h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <MdOutlineCloudUpload className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm text-gray-500">اضغط لرفع صورة</span>
              <input
                id="photo_office_rent"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo_office_rent")}
              />
            </label>
          )}
          {imagePreviews.photo_office_rent && (
            <div className="relative mt-2 w-full max-w-md">
              <Image
                src={imagePreviews.photo_office_rent}
                alt="Image 1 Preview"
                width={128}
                height={128}
                className="w-full max-w-lg h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("photo_office_rent")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
              >
                <AiOutlineClose className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {errors.photo_office_rent && (
          <p className="text-red-500 text-sm mt-2">
            {typeof errors.photo_office_rent?.message === "string"
              ? errors.photo_office_rent.message
              : null}
          </p>
        )}
      </div>
      <div>
        <label className="block text-end text-lg font-semibold text-gray-700 mb-2">
          {t("labels.national_id_card_photo")}
        </label>
        <div className="flex justify-center">
          {!imagePreviews.card_id_img && (
            <label
              htmlFor="card_id_img"
              className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center max-w-lg h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <MdOutlineCloudUpload className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm text-gray-500">اضغط لرفع صورة</span>
              <input
                id="card_id_img"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "card_id_img")}
              />
            </label>
          )}
          {imagePreviews.card_id_img && (
            <div className="relative mt-2 w-full max-w-md">
              <Image
                src={imagePreviews.card_id_img}
                alt="Image 1 Preview"
                width={128}
                height={128}
                className="w-full max-w-lg h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("card_id_img")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
              >
                <AiOutlineClose className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {errors.card_id_img && (
          <p className="text-red-500 text-sm mt-2">
            {typeof errors.card_id_img?.message === "string"
              ? errors.card_id_img.message
              : null}
          </p>
        )}
      </div>
      <div>
        <label className="block text-end text-lg font-semibold text-gray-700 mb-2">
          {t("labels.national_id_card_photo")}
        </label>
        <div className="flex justify-center">
          {!imagePreviews.photo_passport && (
            <label
              htmlFor="photo_passport"
              className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center max-w-lg h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <MdOutlineCloudUpload className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm text-gray-500">اضغط لرفع صورة</span>
              <input
                id="photo_passport"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo_passport")}
              />
            </label>
          )}
          {imagePreviews.photo_passport && (
            <div className="relative mt-2 w-full max-w-md">
              <Image
                src={imagePreviews.photo_passport}
                alt="Image 1 Preview"
                width={128}
                height={128}
                className="w-full max-w-lg h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("photo_passport")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
              >
                <AiOutlineClose className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {errors.photo_passport && (
          <p className="text-red-500 text-sm mt-2">
            {typeof errors.photo_passport?.message === "string"
              ? errors.photo_passport.message
              : null}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="lg:text-2xl md:text-xl text-lg cursor-pointer md:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
        >
          {t("back")}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="lg:text-2xl md:text-xl text-lg cursor-pointer md:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
        >
          {t("next")}
        </button>
      </div>
    </>
  );
};

export default ImageUploadForm;
