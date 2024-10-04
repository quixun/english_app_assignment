import { Modal, Box, Typography, Button } from "@mui/material";
import styled from "styled-components";

type DeletePopUpProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeletePopUp = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
}: DeletePopUpProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{message}</Typography>
        <ModalButtonContainer>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default DeletePopUp;

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
