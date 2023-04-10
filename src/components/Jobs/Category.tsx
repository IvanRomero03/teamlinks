import { useState } from "react";

interface Props {
  name: string;
  items: string[];
}

const Category = ({ name, items }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <p
        onClick={() => setOpen(!open)}
        className={
          "cursor-pointer " +
          (open ? "text-emerald-400 underline " : " hover:underline")
        }
      >
        {name} {open ? "-" : "+"}
      </p>
      {open && (
        <ul>
          {items.map((item) => (
            <li className="ml-4 hover:underline" key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
