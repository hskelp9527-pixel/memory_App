type PaperModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function PaperModal({ children, onClose }: PaperModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(58,46,38,0.82)] px-3 py-4 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:px-6 sm:py-8">
      <button
        aria-label="关闭"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div className="mv-sheet-in relative z-10 mx-auto mt-3 w-full max-w-[17rem] overflow-hidden border border-white/10 bg-paper shadow-[15px_15px_30px_rgba(0,0,0,0.5)] sm:mt-0 sm:max-w-[24rem] md:max-w-5xl">
        {children}
      </div>
    </div>
  );
}
