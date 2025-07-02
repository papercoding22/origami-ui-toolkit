import { Portal, Select as SelectChakra, Spinner, type ListCollection } from '@chakra-ui/react';

export interface NamedItem {
  name: string;
}

export interface AsyncSelectProps<T extends NamedItem> {
  label?: string;
  collection: ListCollection<T>;
  loading?: boolean;
}

export const AsyncSelect = <T extends NamedItem>({
  label = 'Select item',
  collection,
  loading,
}: AsyncSelectProps<T>) => {
  return (
    <SelectChakra.Root collection={collection} size="sm" width="320px">
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
