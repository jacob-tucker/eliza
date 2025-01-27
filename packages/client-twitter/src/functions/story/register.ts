import { account } from "./utils";
import { IpMetadata } from "@story-protocol/core-sdk";
import { client } from "./utils";
import { uploadJSONToIPFS } from "../pinata/uploadToIpfs";
import { uploadBase64ToIPFS } from "../pinata/uploadToIpfs";
import { Address } from "viem";
import { createHash } from "crypto";

export async function registerIp(imageBase64: string, prompt: string) {
    const imageIpfsHash = await uploadBase64ToIPFS(imageBase64);

    const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
        title: "Generated Design Image",
        description:
            "An image generated from FLUX API and prompted by 0xDesignIntern",
        ipType: "image",
        attributes: [
            {
                key: "Model",
                value: "FLUX 1.1 [pro] ultra Finetune",
            },
            {
                key: "Prompt",
                value: prompt,
            },
        ],
        media: [
            {
                mimeType: "image/jpeg",
                url: `https://ipfs.io/ipfs/${imageIpfsHash}`,
                name: "Generated Design Image",
            },
        ],
        creators: [
            {
                name: "0xDesignIntern",
                contributionPercent: 100,
                address: account.address,
            },
        ],
    });

    const nftMetadata = {
        name: "Generated Design Ownership NFT",
        description:
            "This NFT represents ownership of the generated design image.",
        image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
        attributes: [
            {
                key: "Model",
                value: "FLUX 1.1 [pro] ultra Finetune",
            },
            {
                key: "Prompt",
                value: prompt,
            },
        ],
    };

    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
    const ipHash = createHash("sha256")
        .update(JSON.stringify(ipMetadata))
        .digest("hex");
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
    const nftHash = createHash("sha256")
        .update(JSON.stringify(nftMetadata))
        .digest("hex");

    const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
        spgNftContract: process.env.STORY_SPG_NFT_CONTRACT_ADDRESS as Address,
        terms: [], // IP already has non-commercial social remixing terms. You can add more here.
        ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            ipMetadataHash: `0x${ipHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
            nftMetadataHash: `0x${nftHash}`,
        },
        txOptions: { waitForTransaction: true },
    });

    console.log(
        `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
    );
    console.log(
        `View on the explorer: https://explorer.story.foundation/ipa/${response.ipId}`
    );
}
