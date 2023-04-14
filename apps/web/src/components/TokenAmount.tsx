import { ethers } from "ethers";
import { Address, useToken } from "wagmi";
import { formatMoney } from "~/utils/currency";
import { isNativeToken } from "~/utils/token";
import { Skeleton } from "./ui/Skeleton";

export const TokenAmount = ({
  amount,
  token,
}: {
  amount: string;
  token: Address;
}) => {
  const { data, isLoading } = useToken({
    address: token,
    enabled: !isNativeToken(token),
  });

  const formatted = (val: string) =>
    ethers.utils.formatUnits(val, data?.decimals);

  return (
    <Skeleton className="w-24" isLoading={isLoading}>
      {formatMoney(formatted(amount))}
    </Skeleton>
  );
};
