import { Portal, Select as SelectChakra, Spinner, type SelectRootProps } from '@chakra-ui/react';
import { type Item } from '../../models';

export interface SelectProps<T extends Item> extends SelectRootProps<T> {
  label?: string;
  loading?: boolean;
}

export const Select = <T extends Item>(props: SelectProps<T>) => {
  const { label = 'Select item', loading, collection, ...rest } = props;

  return (
    <SelectChakra.Root {...rest} collection={collection}>
      <SelectChakra.HiddenSelect />
      <SelectChakra.Label>{label}</SelectChakra.Label>
      <SelectChakra.Control>
        <SelectChakra.Trigger>
          <SelectChakra.ValueText placeholder={label} />
        </SelectChakra.Trigger>
        <SelectChakra.IndicatorGroup>
          {loading && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
          <SelectChakra.Indicator />
        </SelectChakra.IndicatorGroup>
      </SelectChakra.Control>
      <Portal>
        <SelectChakra.Positioner>
          <SelectChakra.Content>
            {collection.items.map((item) => (
              <SelectChakra.Item item={item} key={item.name}>
                {item.name}
                <SelectChakra.ItemIndicator />
              </SelectChakra.Item>
            ))}
          </SelectChakra.Content>
        </SelectChakra.Positioner>
      </Portal>
    </SelectChakra.Root>
  );
};
