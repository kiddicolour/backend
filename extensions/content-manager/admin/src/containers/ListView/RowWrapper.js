import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from '../../utils/ItemTypes';
import DraggedRow from '../../components/DraggedRow';
import useLayoutDnd from '../../hooks/useLayoutDnd';

const RowWrapper = ({ }) => {

  const ref = useRef(null);
  const { setIsDraggingSibling } = useLayoutDnd();

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      move(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    begin: () => {
      setIsDraggingSibling(true);
    },
    end: () => {
      setIsDraggingSibling(false);
    },
    item: { type: ItemTypes.FIELD, id: name, name, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, [preview]);

  drag(drop(ref));

  return (
    <DraggedRow
      count={count}
      ref={ref}
      isDragging={isDragging}
      label={label}
      name={name}
      onClick={onClick}
      onRemove={onRemove}
      selectedItem={selectedItem}
    />
  );

}


RowWrapper.defaultProps = {
  index: 0,
  label: '',
  selectedItem: '',
};

RowWrapper.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number,
  label: PropTypes.string,
  move: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
};

export default RowWrapper;

