import {
  Box,
  Space,
  Text,
  TextInput,
  Center,
  Badge,
  ActionIcon,
  Group,
  Button,
  Chips,
  Chip,
  Modal,
  Switch,
  Table,
  Tooltip,
} from "@mantine/core";
import {
  TbArrowBarUp,
  TbExternalLink,
  TbListSearch,
  TbSettings,
  TbX,
} from "react-icons/tb";

import { getHotkeyHandler, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Wrapper from "./components/Wrapper";
import PageTitle from "./components/PageTitle";
import WarnNotification from "./components/WarnNotification";
import {
  gogl,
  wiki,
  thes,
  dict,
  stck,
  twtr,
  lnkd,
  inst,
} from "./constants/RegExps";
import TabResponse from "./functions/TabResponse";

import data from "./constants/searchData";
import InfoTable from "./components/InfoTable";

dayjs().format();

let HourFormat12 = "hh:mm:ss a";
let HourFormat24 = "HH:mm:ss";

const App = () => {
  const [value, setValue] = useState("");
  const [infoModalOpened, setInfoModalOpened] = useState(false);
  const [previewModalOpened, setPreviewModalOpened] = useState(false);
  const [settingModalOpened, setSettingModalOpened] = useState(false);

  const [timeStyle, setTimeStyle] = useLocalStorage<"12" | "24">({
    key: "time-format",
    defaultValue: "12",
  });
  const [showSeconds, setShowSeconds] = useLocalStorage<"true" | "false">({
    key: "show-seconds",
    defaultValue: "true",
  });
  const [showPreview, setShowPreview] = useLocalStorage<"true" | "false">({
    key: "show-frame",
    defaultValue: "true",
  });

  let format = "";
  if (timeStyle === "12" && showSeconds === "true") {
    format = HourFormat12;
  } else if (timeStyle === "12" && showSeconds === "false") {
    format = HourFormat12.replace(":ss", "");
  } else if (timeStyle === "24" && showSeconds === "true") {
    format = HourFormat24;
  } else {
    format = HourFormat24.replace(":ss", "");
  }

  const [dateTime, setDateTime] = useState({
    date: dayjs().format("dddd, MMMM D, YYYY"),
    time: dayjs().format(format),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      dayjs().format();
      setDateTime({
        date: dayjs().format("dddd, MMMM D, YYYY"),
        time: dayjs().format(format),
      });
    }, 500);
    return () => clearInterval(timer);
  }, [format]);

  let query = "";
  let queryType = 0;

  if (gogl.test(value)) {
    query = value.replace(gogl, "");
    queryType = 1;
  } else if (wiki.test(value)) {
    query = value.replace(wiki, "");
    queryType = 2;
  } else if (dict.test(value)) {
    query = value.replace(dict, "");
    queryType = 3;
  } else if (thes.test(value)) {
    query = value.replace(thes, "");
    queryType = 4;
  } else if (stck.test(value)) {
    query = value.replace(stck, "");
    queryType = 5;
  } else if (twtr.test(value)) {
    query = value.replace(twtr, "");
    queryType = 6;
  } else if (inst.test(value)) {
    query = value.replace(inst, "");
    queryType = 7;
  } else if (lnkd.test(value)) {
    query = value.replace(lnkd, "");
    queryType = 8;
  } else {
    query = value;
    queryType = 0;
  }

  const openResult = () => {
    if (value !== "") {
      if (data[queryType].previewAllowed && showPreview === "true") {
        setPreviewModalOpened(true);
      } else {
        TabResponse(data[queryType], query);
      }
    } else {
      WarnNotification();
    }
  };

  const settingModal = (
    <Modal
      centered
      opened={settingModalOpened}
      onClose={() => setSettingModalOpened(false)}
      size="lg"
      overlayBlur={5}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
      radius="lg"
    >
      <Center>
        <Text
          color="pink"
          weight={600}
          sx={{
            fontFamily: "Rubik",
            fontSize: "2rem",
          }}
        >
          Preferences
        </Text>
      </Center>
      <Center>
        <Table
          horizontalSpacing="xl"
          verticalSpacing="md"
          fontSize="lg"
          style={{
            textAlign: "left",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  fontFamily: "Rubik",
                  fontWeight: 600,
                }}
              >
                Show Preview Frame
              </td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Switch
                  color="green"
                  size="lg"
                  onLabel="ON"
                  offLabel="OFF"
                  checked={showPreview === "true"}
                  onChange={() =>
                    setShowPreview(showPreview === "true" ? "false" : "true")
                  }
                  onKeyDown={getHotkeyHandler([
                    [
                      "Enter",
                      () =>
                        setShowPreview(
                          showPreview === "true" ? "false" : "true"
                        ),
                    ],
                  ])}
                  styles={{
                    label: { fontWeight: 700 },
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "Rubik",
                  fontWeight: 600,
                }}
              >
                Show Seconds
              </td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Switch
                  color="green"
                  size="lg"
                  onLabel="ON"
                  offLabel="OFF"
                  checked={showSeconds === "true"}
                  onChange={() =>
                    setShowSeconds(showSeconds === "true" ? "false" : "true")
                  }
                  onKeyDown={getHotkeyHandler([
                    [
                      "Enter",
                      () =>
                        setShowSeconds(
                          showSeconds === "true" ? "false" : "true"
                        ),
                    ],
                  ])}
                  styles={{
                    label: { fontWeight: 700 },
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "Rubik",
                  fontWeight: 600,
                }}
              >
                Time Style
              </td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Chips
                  variant="filled"
                  spacing="md"
                  size="md"
                  multiple={false}
                  value={timeStyle}
                  onChange={() =>
                    setTimeStyle((current) => (current === "12" ? "24" : "12"))
                  }
                  color="green"
                  onKeyDown={getHotkeyHandler([
                    [
                      "Enter",
                      () =>
                        setTimeStyle((current) =>
                          current === "12" ? "24" : "12"
                        ),
                    ],
                  ])}
                >
                  <Chip
                    value="12"
                    sx={{
                      fontFamily: "Rubik",
                      fontWeight: 600,
                    }}
                  >
                    12 Hour
                  </Chip>
                  <Chip
                    value="24"
                    sx={{
                      fontFamily: "Rubik",
                      fontWeight: 600,
                    }}
                  >
                    24 Hour
                  </Chip>
                </Chips>
              </td>
            </tr>
          </tbody>
        </Table>
      </Center>
      <Space h="lg" />
      <Button
        fullWidth
        color="cyan"
        onClick={() => setSettingModalOpened(false)}
        radius="lg"
      >
        Save
      </Button>
    </Modal>
  );

  const infoModal = (
    <Modal
      centered
      opened={infoModalOpened}
      onClose={() => setInfoModalOpened(false)}
      title="Search Keys"
      size="xl"
      overlayBlur={5}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
      radius="lg"
      overflow="outside"
    >
      <Center>
        <Text
          color="pink"
          sx={{
            fontFamily: "Rubik",
            fontWeight: 600,
            fontSize: "2rem",
          }}
        >
          Search Keys
        </Text>
      </Center>
      <Center>
        <InfoTable />
      </Center>
    </Modal>
  );

  const previewModal = (
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
              onClick={() => TabResponse(data[queryType], query)}
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
            src={data[queryType].link + `${query}`}
            frameBorder="0"
            width={"100%"}
            height={700}
            style={{ borderRadius: "0.5rem" }}
          />
        </Center>
      </Modal>
    </>
  );

  return (
    <>
      {previewModal}
      {settingModal}
      {infoModal}
      <Box
        sx={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingRight: "2rem",
          paddingLeft: "2rem",
        }}
      >
        <Group position="apart" grow>
          <Text
            weight={700}
            transform="uppercase"
            sx={{
              fontFamily: "Rubik",
              fontSize: "1.5rem",
            }}
          >
            {dateTime.time}
          </Text>
          <Text
            weight={700}
            sx={{
              fontFamily: "Rubik",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {dateTime.date}
          </Text>
          <Group position="right">
            {showPreview === "true" && (
              <Tooltip
                radius="md"
                transition="fade"
                transitionDuration={200}
                label="Show Preview"
              >
                <ActionIcon
                  tabIndex={100}
                  onClick={() => {
                    if (value !== "") {
                      setPreviewModalOpened(true);
                    } else {
                      WarnNotification();
                    }
                  }}
                  size="xl"
                  variant="light"
                >
                  <TbArrowBarUp size={32} />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip
              radius="md"
              transition="fade"
              transitionDuration={200}
              label="Shortcuts"
            >
              <ActionIcon
                tabIndex={100}
                onClick={() => setInfoModalOpened(true)}
                size="xl"
                variant="light"
              >
                <TbListSearch size={32} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              radius="md"
              transition="fade"
              transitionDuration={200}
              label="Settings"
            >
              <ActionIcon
                tabIndex={101}
                onClick={() => setSettingModalOpened(true)}
                size="xl"
                variant="light"
              >
                <TbSettings size={32} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Box>
      <Wrapper>
        <PageTitle paddingTop={0}>multi-search</PageTitle>
        <TextInput
          autoFocus
          tabIndex={1}
          icon={
            <ActionIcon
              tabIndex={-1}
              sx={(theme) => ({
                color: theme.colors[data[queryType].color][1],
              })}
            >
              {data[queryType].icon}
            </ActionIcon>
          }
          radius="xl"
          size="xl"
          rightSection={
            <Badge
              size="xl"
              variant="filled"
              color={data[queryType].color}
              sx={{
                fontFamily: "Rubik",
                fontWeight: 700,
              }}
            >
              {data[queryType].name} Search
            </Badge>
          }
          placeholder="Search"
          rightSectionWidth={data[queryType].width}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={getHotkeyHandler([["Enter", openResult]])}
          sx={{
            paddingBottom: "2rem",
          }}
        />
      </Wrapper>
    </>
  );
};

export default App;
