export let deliveryOptions= [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 5000
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 10000
}];

export function getdeliveryOption(deliveryOptionId){
    let deliveryOption;
      deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
  });

  return deliveryOption || deliveryOptions[0];
}