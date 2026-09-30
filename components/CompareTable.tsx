import type { CompareTable as T } from "@/content/schema";

/** Compare drawer: closed by default so it does not break the reading flow. */
export function CompareTable({ table, open = false }: { table: T; open?: boolean }) {
  return (
    <details className="compare" open={open}>
      <summary>
        <span className="compare-kicker">Compare</span> {table.title}
      </summary>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {table.headers.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => (
              <tr key={r[0]}>
                <th scope="row">{r[0]}</th>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
