"use client";

import { ElementType, forwardRef, useImperativeHandle, ForwardedRef} from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import useRefs from "@/hwiui/hooks/useRefs";

const CLASSSNAMES = Object.freeze({
  component: "inline-block opacity-0"
});

type CharactersProp = {
  component?: ElementType | null
  text: string | null,
  initialCollectionValue?: HTMLElement[]
};

// TODO: wrapped by a Typography
const Characters = forwardRef<HTMLElement[], CharactersProp>(({
  component = null,
  text = null,
  initialCollectionValue
}: CharactersProp, ref: ForwardedRef<HTMLElement[]>) => {
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
});

Characters.displayName = getDisplayName(Characters);

Characters.propTypes = {
  component: PropTypes.elementType,
  text: PropTypes.string,
  initialCollectionValue: PropTypes.array
};

export default Characters;
