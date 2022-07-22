import React, {
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
} from "react";

type InputProps = {
  leftSection?: {
    placeholder: string;
  };
} & React.HTMLProps<HTMLInputElement>;

const XYZInput: React.FC<InputProps> = (props) => {
  const { leftSection, ...rest } = props;

  return (
    <div className="w-full lg:w-1/4">
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
          {...rest}
        />
      </div>
    </div>
  );
};

export default XYZInput;
