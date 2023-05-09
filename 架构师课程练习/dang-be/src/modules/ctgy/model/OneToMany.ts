import { secondCtgyModel } from './SecCtgyModel';
import { thirdCtgyModel } from './ThirdCtgyModel';

// OneToMany
secondCtgyModel.hasMany(thirdCtgyModel, {
  as: 'thirdctgy',
  foreignKey: 'secondctgyId',
});
// ManyToOne
thirdCtgyModel.belongsTo(secondCtgyModel, {
  foreignKey: 'secondctgyId',
  targetKey: 'secondctgyId',
});

async function findCtgy(firstctgyId: number) {
  const result = await secondCtgyModel.findAll({
    // raw: true,
    where: {
      firstctgyId,
    },
    include: [
      {
        model: thirdCtgyModel,
        as: 'thirdctgy',
      },
    ],
  });
  return result;
}

export default findCtgy;
