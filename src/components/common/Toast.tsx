import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgColors = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200',
};

const textColors = {
  success: 'text-green-800',
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800',
};

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  return (
    <div className={`
      flex items-start p-4 mb-2 rounded-lg border shadow-lg
      ${bgColors[toast.type]}
      animate-in slide-in-from-right
    `}>
      <div className="flex-shrink-0">
        {icons[toast.type]}
      </div>
      <div className={`ml-3 flex-1 ${textColors[toast.type]}`}>
        {toast.message}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};
