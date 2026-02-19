import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";

const meta: Meta = {
  title: "Components/Table",
};

export default meta;
type Story = StoryObj;

const sampleData = [
  { name: "Karin Svensson", role: "Ordforande", status: "Aktiv" },
  { name: "Erik Lindberg", role: "Kassor", status: "Aktiv" },
  { name: "Anna Holm", role: "Sekreterare", status: "Aktiv" },
  { name: "Lars Pettersson", role: "Ledamot", status: "Inaktiv" },
  { name: "Maria Johansson", role: "Ledamot", status: "Aktiv" },
];

export const Default: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Namn</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Roll</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.name}>
            <Table.RowHeaderCell>{row.name}</Table.RowHeaderCell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table.Root striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Namn</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Roll</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.name}>
            <Table.RowHeaderCell>{row.name}</Table.RowHeaderCell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  ),
};

export const WithBadges: Story = {
  name: "Combined with Badge",
  render: () => {
    // Import inline to avoid circular dependency in stories
    const { Badge } = require("../Badge");
    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Medlem</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Avgift</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Karin Svensson</Table.RowHeaderCell>
            <Table.Cell>
              <Badge semantic="success">Betald</Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Erik Lindberg</Table.RowHeaderCell>
            <Table.Cell>
              <Badge semantic="warning">Forsenad</Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Lars Pettersson</Table.RowHeaderCell>
            <Table.Cell>
              <Badge semantic="pending">Vantar</Badge>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    );
  },
};
