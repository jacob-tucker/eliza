import axios from "axios";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
});

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
    const { IpfsHash } = await pinata.upload.json(jsonMetadata);
    return IpfsHash;
}

export async function uploadImageUrlToIPFS(imageUrl: string): Promise<string> {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const file = new File([buffer], "image.jpeg", { type: "image/jpeg" });
    const { IpfsHash } = await pinata.upload.file(file);
    return IpfsHash;
}

export async function uploadBase64ToIPFS(base64Data: string): Promise<string> {
    // Remove data URL prefix if present
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Content, "base64");

    const file = new File([buffer], "image.jpeg", { type: "image/jpeg" });
    const { IpfsHash } = await pinata.upload.file(file);
    return IpfsHash;
}
