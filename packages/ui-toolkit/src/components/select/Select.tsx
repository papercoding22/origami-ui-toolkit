import {
  createListCollection,
  Portal,
  Select as SelectChakra,
  Spinner,
  type SelectRootProps,
} from '@chakra-ui/react';

/**
 * The component should define its own types for items.
 * The consumer of this component should ensure that the items passed in match the expected structure.
 * They do not need to have knowledge of Chakra's internal types.
 */
export interface Item {
  name: string;
  value: string;
  disabled?: boolean;
}

type PartialSelectRootProps = Omit<SelectRootProps<Item>, 'collection'>;

export interface SelectProps extends PartialSelectRootProps {
  items: Item[];
  label?: string;
  loading?: boolean;
}

export const Select = (props: SelectProps) => {
  const { label = 'Select item', loading, ...rest } = props;

  const collection = createListCollection<Item>({
    items: props.items || [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.value,
    isItemDisabled: (item) => item.disabled || false,
  });

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
