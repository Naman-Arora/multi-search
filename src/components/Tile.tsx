import { Avatar, Card, Center, Text } from "@mantine/core";

type Props = {
  name: string;
  link: string;
  color: string;
};

const Tile = (props: Props) => {
  return (
    <>
      <Card
        shadow="sm"
        p=""
        radius="lg"
        component="a"
        withBorder
        sx={{
          margin: "1rem",
        }}
        href={props.link}
      >
        <Card.Section
          sx={{
            padding: "1rem",
          }}
        >
          <Center>
            <Avatar radius="xl" size="xl" color={props.color} alt={props.name}>
              {props.name.toUpperCase().charAt(0)}
            </Avatar>
          </Center>
        </Card.Section>
        <Card.Section>
          <Center>
            <Text
              weight={600}
              sx={{
                fontFamily: "Rubik",
                paddingRight: "2rem",
                paddingLeft: "2rem",
                paddingBottom: '1rem',
                paddingTop: '0.5rem',
                fontSize: "1rem",
              }}
            >
              Add Shortcut
            </Text>
          </Center>
        </Card.Section>
      </Card>
    </>
  );
};

export default Tile;
