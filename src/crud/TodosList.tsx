export default function TodoDetail() {
  return (
    <div>
      <h2>Details</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
