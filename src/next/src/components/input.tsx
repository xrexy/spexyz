import * as z from "zod";

const slugSchema = z.string().max(32).min(2);
const urlSchema = z.string().url().max(64).min(8);

const XYZInput: React.FC<{
  leftSection?: {
    placeholder: string;
  };
}> = ({ leftSection }) => {
  return (
    <form className="w-full md:w-1/3">
      <div className="relative flex w-full flex-wrap items-stretch">
        {leftSection?.placeholder && (
          <div className="-mr-px flex">
            <span className="whitespace-no-wrap flex items-center rounded rounded-r-none border border-r-0 px-3 pr-1 text-sm leading-normal text-gray-400">
              {leftSection.placeholder}
            </span>
          </div>
        )}
        <input
          type="text"
          name="xqzinput"
          className={`border-grey-light relative h-10 w-px flex-1 flex-shrink flex-grow rounded rounded-l-none border px-3 pl-1 leading-normal ${
            leftSection?.placeholder ? "border-l-0 outline-none" : "pl-3 "
          }`}
          maxLength={leftSection?.placeholder ? 32 : 64}
          minLength={leftSection?.placeholder ? 2 : 8}
        />
      </div>
      <p className="pl-4 text-xs italic text-red-500">
        Please fill out this field.
      </p>
    </form>
  );
};

export default XYZInput;
