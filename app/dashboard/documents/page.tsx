"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentCard from "@/components/document-card";
import UploadDocument from "@/components/upload-document";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DocumentsPage() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 lg:mb-20">
        <h1 className="text-3xl font-bold">My Documents</h1>
        <UploadDocument />
      </div>

      <div className="h-[calc(100vh-280px)] overflow-y-auto">
        {/* Loader Skeleton */}
        {!documents && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {new Array(8).fill("").map((_, idx) => (
              <Card
                key={idx}
                className="h-[200px] p-6 flex flex-col justify-between"
              >
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="w-[80px] h-[40px] rounded" />
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {documents && documents.length === 0 && (
          <div className="py-12 flex flex-col justify-center items-center gap-8">
            <Image
              src="/documents.svg"
              width="200"
              height="200"
              alt="a picture of a girl holding documents"
            />
            <h2 className="text-2xl text-muted-foreground">
              You have no documents
            </h2>
            <UploadDocument isEmptyState />
          </div>
        )}

        {documents && documents.length >= 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {documents?.map((doc) => (
              <DocumentCard key={doc._id} document={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
