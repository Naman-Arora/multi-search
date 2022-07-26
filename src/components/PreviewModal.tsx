import { ActionIcon, Center, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { TbExternalLink, TbX } from "react-icons/tb";
import data from "../constants/data";
import TabResponse from "../functions/TabResponse";
type Props = {
  num: number,
  query: string,
  isOpen: boolean,
}

const PreviewModal = (props: Props) => {
  const [previewModalOpened, setPreviewModalOpened] = useState(false);
  return (
    <>
      <Modal
        centered
        opened={previewModalOpened}
        onClose={() => setPreviewModalOpened(false)}
        size={"full"}
        overlayBlur={5}
        transition="slide-up"
        transitionDuration={500}
        transitionTimingFunction="ease"
        radius="lg"
        overflow="outside"
        withCloseButton={false}
      >
        <Group
          position="apart"
          sx={{
            paddingBottom: "1rem",
            paddingRight: "0rem",
          }}
        >
          <div>
            <Text
              color="pink"
              sx={{
                fontFamily: "Rubik",
                fontWeight: 600,
                fontSize: "2rem",
                paddingLeft: "2.5rem",
              }}
            >
              Preview
            </Text>
          </div>
          <Group position="right">
            <ActionIcon
              size={32}
              onClick={() => TabResponse(data[props.num], props.query)}
            >
              <TbExternalLink size={32} />
            </ActionIcon>
            <ActionIcon size={32} onClick={() => setPreviewModalOpened(false)}>
              <TbX size={32} />
            </ActionIcon>
          </Group>
        </Group>
        <Center>
          <iframe
            title="web view"
            src={data[props.num].link + `${props.query}`}
            frameBorder="0"
            width={1200}
            height={700}
            style={{ borderRadius: "0.5rem" }}
          />
        </Center>
      </Modal>
    </>
  );
};

export default PreviewModal;
