import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import React from "react";

type Props = {
  onRetry: () => void;
};

function ChatsErrorState({ onRetry }: Props) {
  return (
    <div className="text-center p-8 max-w-md space-y-6">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">
          Failed to load chats
        </h2>
        <p className="text-muted-foreground">
          We couldn&apos;t load your chat list. This might be due to a
          connection issue or server error.
        </p>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="font-medium"
        onClick={onRetry}
      >
        <RefreshCcw className="w-5 h-5 mr-2" />
        Try again
      </Button>
    </div>
  );
}

export default ChatsErrorState;
