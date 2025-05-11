"use client";

import { useState, useEffect } from "react";
import { motion} from "framer-motion";
import { MessageSquare} from "lucide-react";

export default function EmptyChatState() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-md px-6"
      >
        <ChatEmblem />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mt-8 mb-2 text-slate-800 dark:text-slate-100 tracking-tight">
            Welcome to PulseChat
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-sm mx-auto">
            Your conversations are just a click away. Select a chat or start a
            new conversation.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ChatEmblem() {
  return (
    <motion.div
      className="relative w-36 h-36 mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      }}
    >
      <motion.div
        className="absolute inset-0  bg-gradient-to-br from-blue-400 via-blue-800 to-blue-900 shadow-xl rounded-full"
        animate={{
          boxShadow: [
            "0px 0px 0px 0px rgba(59, 130, 246, 0.3)",
            "0px 0px 30px 5px rgba(59, 130, 246, 0.3)",
            "0px 0px 0px 0px rgba(59, 130, 246, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute inset-[3px] bg-gradient-to-br from-blue-400 via-blue-800 to-blue-900 bg-blue-600  rounded-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <MessageSquare className="h-16 w-16 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
