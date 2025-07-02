import { Portal, Select as SelectChakra, Spinner, type SelectRootProps } from '@chakra-ui/react';

export interface SelectItem {
  name: string;
  id?: string; // Optional ID for the item
}

export interface AsyncSelectProps<T extends SelectItem> extends SelectRootProps<T> {
  label?: string;
  loading?: boolean;
}

export const AsyncSelect = <T extends SelectItem>(props: AsyncSelectProps<T>) => {
  const { label = 'Select item', loading, collection, ...rest } = props;

  return (
    <SelectChakra.Root {...rest} size="sm" width="320px" collection={collection}>
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
