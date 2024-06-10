"use client";

import { ElementType, memo, forwardRef, useImperativeHandle, ForwardedRef} from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import useRefs from "@/ui/hooks/useRefs";

const CLASSSNAMES = Object.freeze({
  component: "inline-block opacity-0"
});

type CharactersProp = {
  component?: ElementType | null
  text: string | null,
  initialCollectionValue?: HTMLElement[]
};

Characters.propTypes = {
  component: PropTypes.elementType,
  text: PropTypes.string,
  initialCollectionValue: PropTypes.array
};

function Characters({
  component = null,
  text = null,
  initialCollectionValue
}: CharactersProp, ref: ForwardedRef<HTMLElement[]>) {
  const [refs, setRefs] = useRefs<HTMLElement>(initialCollectionValue ?? []);

  useImperativeHandle<HTMLElement[], HTMLElement[]>(ref, () => (refs.current as HTMLElement[]), []);
  
  if(!text?.length) {
    return "Invalid text";
  }

  const Component: ElementType = component ?? "span";
  return (
    text.split("").map((character, index) => (
      <Component
        key={index}
        className={CLASSSNAMES.component}
        ref={setRefs(index)}>
        {character}
      </Component>
    ))
  );
}

export default memo(forwardRef<HTMLElement[], CharactersProp>(withDisplayName()(Characters)));
