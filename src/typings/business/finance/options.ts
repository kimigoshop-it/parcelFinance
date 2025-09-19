import { BillStatus } from '.';

const BillStatusOptions = [
  {
    label: '待对账',
    value: BillStatus.WAITING_FOR_BILL
  },
  {
    label: '待确认',
    value: BillStatus.WAITING_FOR_CONFIRM
  }
];

export default { BillStatusOptions };
