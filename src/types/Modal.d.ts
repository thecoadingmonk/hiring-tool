export interface ModalProps {
  children: ReactElement;
  show: boolean;
  onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
