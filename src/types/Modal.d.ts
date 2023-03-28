export interface ModalProps {
  children: ReactElement;
  show: boolean;
  className?: string;
  onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
