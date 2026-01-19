import { ChevronDownIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

type CollapsibleItemProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function CollapsibleItem({
  title,
  defaultOpen,
  children,
}: CollapsibleItemProps) {
  return (
    <>
      <Collapsible
        className="w-full group/collapsible"
        defaultOpen={defaultOpen ?? false}
      >
        <CollapsibleTrigger className="w-full mb-4 flex flex-row justify-between items-center">
          <span className="text-2xl font-semibold">{title}</span>
          <ChevronDownIcon className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
      <Separator className="my-4 w-full" />
    </>
  );
}
