import { Web3Storage } from "web3.storage";

const ipfsClient = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY as string,
});
export const ipfsUpload = async (
  data: File | object,
  fileName = "metadata.json"
) => {
  let file = data as File;
  // Data can be either File or a js object
  if (!(data instanceof File)) {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    file = new File([blob], fileName);
  }
  return ipfsClient.put([file]).then((cid: string) => `${cid}/${file.name}`);
};

export const fetchIpfs = async (cid: string) => {
  if (!cid) return null;
  const ipfsGateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://w3s.link/ipfs/";

  return fetch(`${ipfsGateway}${cid}`, {
    headers: { "content-type": "application/json" },
  }).then((r) =>
    r.ok
      ? r.json()
      : {
          title: "NO_METADATA_TITLE",
          description: "NO_METADATA_DESCRIPTION",
        }
  );
};
