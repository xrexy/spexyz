import XYZInput from "./input";
import * as z from "zod";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { StringValidation, ZodError } from "zod";
import { env } from "../server/env.mjs";
import { trpc } from "../utils/trpc";

const ERROR_TIMEOUT_SECONDS = 10;

const redirectSchema = z.object({
  slug: z
    .string()
    .max(32, { message: "Slug must be less than 32 characters" })
    .min(2, { message: "Slug must contain at least 2 characters" }),
  url: z
    .string()
    .url({ message: "Invalid URL provided" })
    .max(64, { message: "URL must be less than 64 characters" })
    .min(8, { message: "URL must contain at least 8 characters" }),
});

type SuccessMessageProps = {
  message: string;
  redirect: string;
  closeCallback?: () => void;
};

const SuccessMessagePartial: React.FC<SuccessMessageProps> = ({
  message,
  redirect,
  closeCallback,
}) => {
  return (
    <div
      id="toast-interactive"
      className="w-full max-w-xs rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="flex">
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lime-600 dark:bg-lime-400 dark:text-lime-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            {message}
          </span>
          <div className="grid grid-cols-2 gap-2 pt-4">
            <div>
              <a
                href={redirect}
                className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-2 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Go now!
              </a>
            </div>
            <div>
              <a
                href="#"
                className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-center text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={closeCallback}
              >
                Okay, cool.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomepageComponent: React.FC<{}> = ({}) => {
  const [errors, setErrors] = useState([] as string[]);
  const [successMessageProps, setSuccessMessageProps] = useState({
    message: "",
    redirect: "",
  } as SuccessMessageProps);
  const { mutate, isLoading } = trpc.useMutation("redirects.create");

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    setErrors([]);

    const { elements } = ev.currentTarget;

    const slugRef = elements.namedItem("slug") as HTMLInputElement;
    const urlRef = elements.namedItem("url") as HTMLInputElement;

    const slug = slugRef?.value;
    const url = urlRef?.value;

    mutate(
      {
        slug,
        url,
      },
      {
        onError(err) {
          try {
            const errParsed = JSON.parse(err.message);
            if (typeof errParsed === "string") {
              return setErrors([errParsed]);
            } else if (
              Object.prototype.toString.call(errParsed) === "[object Array]"
            ) {
              setErrors(errParsed.map((issue: any) => issue.message));
            } else {
              throw new Error();
            }
          } catch (_) {
            if (typeof err.message === "string") {

              if(err.message.endsWith("Unique constraint failed on the (not available)")) {
                return setErrors(["This slug already exits, please choose another one"])
              }

              return setErrors([err.message]);
            }

            setErrors([
              "Couldn't process your error, check console for more info.",
            ]);
          } finally {
            setTimeout(() => setErrors([]), ERROR_TIMEOUT_SECONDS * 1000);
          }
        },

        onSuccess(data, vars, ctx) {
          setErrors([]);
          (urlRef.value = ""), (slugRef.value = "");

          setSuccessMessageProps({
            message: "Successfully created new redirect.",
            redirect: `${window.origin}/api/redirect/${data.slug}`,
            closeCallback: () =>
              setSuccessMessageProps({
                message: "",
                redirect: "",
              }),
          });
        },
      }
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-screen flex-col items-center justify-center bg-white pl-4 pr-4"
    >
      <XYZInput
        placeholder="example"
        leftSection={{ placeholder: "https://spexyz.vercel.com/" }}
        name="slug"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4 mt-4 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>

      <XYZInput placeholder="https://spexyz.vercel.app" name="url" />

      <button className="mt-4 mb-4 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
        Generate
      </button>

      {isLoading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {errors && (
        <ul className="w-1/2 list-disc pt-8 text-center font-medium leading-7 text-red-600">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {successMessageProps.message && (
        <SuccessMessagePartial {...successMessageProps} />
      )}
    </form>
  );
};

export default HomepageComponent;
