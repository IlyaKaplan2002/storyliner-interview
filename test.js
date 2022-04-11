const defUsers = [
  { name: "test" },
  { name: "test1" },
  { name: "test3" },
  { name: "test4" },
  { name: "test5" },
  { name: "test6" },
  { name: "test7" },
  { name: "test8" },
  { name: "test9" },
  { name: "test10" },
  { name: "test11" },
  { name: "test12" },
  { name: "test13" },
  { name: "test14" },
];

const defNets = [
  { u1: "test", u2: "test1" },
  { u1: "test1", u2: "test5" },
  { u1: "test1", u2: "test" },
  { u1: "test2", u2: "test5" },
  { u1: "test3", u2: "test4" },
  { u1: "test7", u2: "test8" },
  { u1: "test10", u2: "test9" },
  { u1: "test6", u2: "test7" },
  { u1: "test13", u2: "test14" },
  { u1: "test15", u2: "test11" },
];

const getRelatedUsers = (user, nets) => {
  const relatedNets = nets.filter((net) => net.u1 === user || net.u2 === user);
  const relatedUsers = relatedNets
    .map((net) => {
      if (net.u1 === user) return net.u2;
      return net.u1;
    })
    .concat([user]);

  return relatedUsers.filter((user, indx, arr) => arr.indexOf(user) === indx);
};

const getCount = (users, nets) => {
  const relatedUsers = users.map(({ name }) => getRelatedUsers(name, nets));
  console.log("relatedUsers", relatedUsers);

  const groups = [relatedUsers[0]];

  relatedUsers.forEach((arr) => {
    let indexInWhich;

    groups.forEach((group, index) => {
      arr.forEach((item) => {
        if (group.includes(item)) {
          indexInWhich = index;
        }
      });
    });

    if (indexInWhich || indexInWhich === 0) {
      groups[indexInWhich] = [...groups[indexInWhich], ...arr].filter(
        (item, indx, arr) => arr.indexOf(item) === indx
      );
    } else {
      groups.push(arr);
    }
  });

  console.log("groups", groups);
  console.log("count", groups.length);

  return { groups, count: groups.length };
};

getCount(defUsers, defNets);
