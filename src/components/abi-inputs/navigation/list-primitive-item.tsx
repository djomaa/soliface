import ListItemButton from '@mui/material/ListItemButton';
import React from 'react';
import { useAbiInputsCtx } from '../ctx';
import { NavMapItem } from './types';

interface IProps extends React.PropsWithChildren {
  title: string;
  item: NavMapItem;
  padding: string;
}
export const NavPrimitiveItem: React.FC<IProps> = ({
  title, padding, children, item: { id, ref },
}) => {
  const { setActive, active, navContainer, inputsContainer } = useAbiInputsCtx();

  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (active === id) {
      itemRef.current!.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
    }
  }, [active])

  return (
    <ListItemButton
      selected={active === id}
      ref={itemRef}
      key={title}
      // dense
      style={{
        padding: 0,
        paddingLeft: padding,
        // border: active === id ? '1px solid red' : undefined,
      }}
      onClick={() => {
        console.log('click', ref)
        setActive(id);
        // if (ref.input?.current) {
        //   ref.input.current.onfocus = () => {
        //     console.log('set active');
        //     setActive(id);
        //   }
        // }
        ref.label.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        const box = inputsContainer!;
        const boxRect = inputsContainer!.getBoundingClientRect();
        const child = ref.label.current!;
        const childRect = ref.label.current!.getBoundingClientRect();
        const maxScrollTop = box.scrollHeight - box.clientTop;
        let offset = childRect.top + inputsContainer!.scrollTop - boxRect.top - box.clientTop;

        if (offset > 0 && Math.ceil(offset + childRect.height) < box.scrollHeight) {
          offset += -box.clientHeight / 2 + childRect.height / 2
          if (offset < 0) {
            offset = 1;
          }
        }
        console.log("🚀 ~ file: list-primitive-item.tsx:48 ~ offset1:", offset)
        console.log('offset debug', box.clientHeight, boxRect.height)
        console.log('offset debug2', box.clientTop, boxRect.top)
        console.log('offset debug3', child.clientTop, boxRect.top)
        inputsContainer?.scroll({
          top: offset,
          behavior: 'smooth',
        })
        ref.input?.current?.focus();
      }}
    >
      {children}
    </ListItemButton>
  );
}
