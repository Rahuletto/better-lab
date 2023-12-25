import { ServerList } from "@/types";

export default function ServerSelect({
  server,
  setServers,
}: {
  server: ServerList;
  setServers: Function;
}) {
  return server ? (
    <select
      required
      value={server}
      onChange={(e) => setServers(e.target.value)}>
      <option disabled>Select batch</option>
      <optgroup label="Kattankulathur">
        <option value="ktretelab2023">KTR 2023</option>
        <option value="ktretelab2022">KTR 2022</option>
        <option value="ktretelab2021">KTR 2021</option>
        <option value="ktretelab2020">KTR 2020</option>
      </optgroup>
      <optgroup label="Ramapuram">
        <option value="rmpetelab2023">RMP 2023</option>
        <option value="rmpetelab2022">RMP 2022</option>
        <option value="rmpetelab2021">RMP 2021</option>
        <option value="rmpetelab2020">RMP 2020</option>
      </optgroup>
      <optgroup label="Vadapalani">
        <option value="vdpetelab2023">VDP 2023</option>
        <option value="vdpetelab2022">VDP 2022</option>
        <option value="vdpetelab2021">VDP 2021</option>
        <option value="vdpetelab2020">VDP 2020</option>
      </optgroup>
    </select>
  ) : (
    <select
      required
      defaultValue="slt"
      onChange={(e) => setServers(e.target.value)}>
      <option value="slt" disabled>
        Select batch
      </option>
      <optgroup label="Kattankulathur">
        <option value="ktretelab2023">KTR 2023</option>
        <option value="ktretelab2022">KTR 2022</option>
        <option value="ktretelab2021">KTR 2021</option>
        <option value="ktretelab2020">KTR 2020</option>
      </optgroup>
      <optgroup label="Ramapuram">
        <option value="rmpetelab2023">RMP 2023</option>
        <option value="rmpetelab2022">RMP 2022</option>
        <option value="rmpetelab2021">RMP 2021</option>
        <option value="rmpetelab2020">RMP 2020</option>
      </optgroup>
      <optgroup label="Vadapalani">
        <option value="vdpetelab2023">VDP 2023</option>
        <option value="vdpetelab2022">VDP 2022</option>
        <option value="vdpetelab2021">VDP 2021</option>
        <option value="vdpetelab2020">VDP 2020</option>
      </optgroup>
    </select>
  );
}
