// src/services/PostmarkSenderSignatureService.ts
import { AccountClient } from 'postmark';
import {
    CreateSignatureRequest,
    Signature,
    SignatureDetails,
    Signatures,
    UpdateSignatureRequest
} from 'postmark/dist/client/models';

export class PostmarkSenderSignatureService {
    private client: AccountClient;

    constructor(accountToken: string) {
        this.client = new AccountClient(accountToken);
    }

    public async getSenderSignatures(): Promise<Signatures> {
        try {
            const result = await this.client.getSenderSignatures();
            console.log(`Total Sender Signatures: ${result.TotalCount}`);
            console.log(result.SenderSignatures);
            result.SenderSignatures.forEach(signature => console.log(signature.Domain));
            return result;
        } catch (error) {
            console.error('Error retrieving sender signatures:', error);
            throw error;
        }
    }

    public async getSenderSignature(id: number): Promise<SignatureDetails> {
        try {
            const result = await this.client.getSenderSignature(id);
            return result;
        } catch (error) {
            console.error('Error retrieving sender signatures:', error);
            throw error;
        }
    }

    public async createSenderSignature(request: CreateSignatureRequest): Promise<Signature> {
        try {
            const result = await this.client.createSenderSignature(request);
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error creating sender signature:', error);
            throw error;
        }
    }

    public async updateSenderSignature(signatureId: number, request: UpdateSignatureRequest): Promise<Signature> {
        try {
            const result = await this.client.editSenderSignature(signatureId, request);
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error updating sender signature:', error);
            throw error;
        }
    }

    public async deleteSenderSignature(signatureId: number): Promise<void> {
        try {
            const result = await this.client.deleteSenderSignature(signatureId);
            console.log(`Message: ${result.Message}`);
            // The actual return type might need to be adjusted based on Postmark client library's specific method signature.
        } catch (error) {
            console.error('Error deleting sender signature:', error);
            throw error;
        }
    }
}
