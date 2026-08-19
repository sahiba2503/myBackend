import React from "react";
function Sidenav() {
  const sidenavItems = [{ id: 1, name: "Task" }];
  return (
    <div className='sidenav'>
      <h1>Sidenav</h1>
      {sidenavItems.map((item) => {
        return <div key={item.id} className='sidenav-item'></div>;
      })}
    </div>
  );
}

export default Sidenav;
