
// function Sidenav() {
//   const sidenavItems = [{ id: 1, name: "Create" },{ id: 2, name: "Show" },{ id: 3, name: "Complete" }];
//   return (
//     <div className='sidenav'>
//       <h4>Sidenav</h4>
//       {sidenavItems.map((item) => {
//         return <div key={item.id} className='sidenav-item'>
//           <li>{item.name}</li>
//           </div>;
//       })}
//     </div>
//   );
// }

// export default Sidenav;

function Sidenav() {
  const sidenavItems = [{ id: 1, name: "Create" },{ id: 2, name: "Show" },{ id: 3, name: "Complete" }];
  return (
    <div className='sidenav'>
      <h4>Sidenav</h4>
      {sidenavItems.map((item) => {
        return <div key={item.id} className='sidenav-item'>
          <li>{item.name}</li>
          </div>;
      })}
    </div>
  );
}

export default Sidenav;
