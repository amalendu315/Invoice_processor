import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox"


export default function VoucherList({ vouchers, onSelect, selectedEntries }:{vouchers:[], onSelect:(indexes:number[])=>void, selectedEntries:number[]}) {
  const [selectAll, setSelectAll] = useState(false);

  //@ts-expect-error due to index
  const handleCheckboxChange = (index) => {
    //@ts-expect-error due to prevSelected
    onSelect((prevSelected) => {
      const updatedSelection = [...prevSelected];
      if (updatedSelection.includes(index)) {
        updatedSelection.splice(updatedSelection.indexOf(index), 1);
      } else {
        updatedSelection.push(index);
      }
      return updatedSelection;
    });
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    onSelect(selectAll ? [] : vouchers.map((_, index) => index));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={selectAll}
              onCheckedChange={handleSelectAllChange}
            />
          </TableHead>
          <TableHead>Voucher Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vouchers.map((voucher, index) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={selectAll || selectedEntries.includes(index)}
                onCheckedChange={() => handleCheckboxChange(index)}
              />
            </TableCell>
            <TableCell>{voucher}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
