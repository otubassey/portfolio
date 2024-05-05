"use client";

import { ElementType, memo, forwardRef, useImperativeHandle, ForwardedRef} from "react";

import useRefs, {RefCollection} from "@/pages/ui/hooks/useRefs";

const CLASSSNAMES = Object.freeze({
  component: "inline-block opacity-0"
});

type CharactersProp = {
  component?: ElementType | null
  text: string | null,
  initialCollectionValue?: RefCollection
};

function Characters({
  component = null,
  text = null,
  initialCollectionValue
}: CharactersProp, ref: ForwardedRef<RefCollection>) {
  const [refs, setRefs] = useRefs(initialCollectionValue);

  useImperativeHandle<RefCollection, RefCollection>(ref, () => (refs.current), []);
  
  if(!text?.length) {
    return "Invalid text";
  }

  const Component: ElementType = component ?? "span";
  return (
    <>
      {
        text.split("").map((character, index) => (
          <Component
            key={index}
            className={CLASSSNAMES.component}
            ref={setRefs(index)}>
            {character}
          </Component>
        ))
      }
    </>
  );
}

export default memo(forwardRef<RefCollection, CharactersProp>(Characters));
