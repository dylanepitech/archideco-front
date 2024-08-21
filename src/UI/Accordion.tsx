import React, { useState } from "react";

type AccordionItemProps = {
  title: string;
  content: string;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full text-left p-4 focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{title}</span>
          <span>{isOpen ? "-" : "+"}</span>
        </div>
      </button>
      {isOpen && (
        <div className="p-4">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

type AccordionProps = {
  items: AccordionItemProps[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="max-w-5xl bg-white shadow-md rounded-lg">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

const Accordions: React.FC = () => {
  const accordionItems: AccordionItemProps[] = [
    {
      title: "Petit électroménager",
      content: "Contenu de la section 1",
    },
    {
      title: "Gros électroménager",
      content: "Contenu de la section 2",
    },
    {
      title: "Aménagement intérieur",
      content: "Contenu de la section 3",
    },
  ];

  return (
    <div className="w-full h-auto">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default Accordions;
