show dbs;

use my_mongo_db;

use BDD2_db_bios;
db.BDD2_db_bios.find(
    {},
   {"awards.award":1, "name.first":1, "awards.year":1, _id: 0}
   ).sort({"awards.year":1})

db.BDD2_db_bios.aggregate(
  [
    { $unwind : "$awards" }
    {$group: { _id: "awards.award", count: {$sum:1}}},
    {$project: {name: "$_id", _id:0, count:1}},
  ]
)

db.BDD2_db_bios.aggregate(
{$unwind: '$awards'},
{$sort: {'awards': 1}},
{$group: {_id: '$_id', 'UsContribs': {$push: '$awards'}}},
{$project: {'awards':
'$UsContribs'}});


db.BDD2_db_bios.aggregate(
        {$unwind: '$awards'},
        {$sort: {'awards.year': 1}},
        {$group: {_id: '$_id', 'EmpCountry': {$push:'$awards'}}},
        {$project: {'awards':'$EmpCountry'}});



    db.BDD2_db_bios.aggregate(
      [
        { $unwind : "$awards" },
        { $group : { _id : "$awards" , number : { $sum : 1 } } },
        { $sort : { "awards.year" : 1 } }
      ]
    )



db.BDD2_db_bios.aggregate([
  {$unwind: '$awards'},
  {$group: {_id: '$_id', 'sum': { $sum: 1}}},
  {$group: {_id: null, total_sum: {'$sum': '$sum'}}}
])


db.BDD2_db_bios.find(
   { "name.aka": {$exists: true}},
   {"name.last": 1, "name.first": 1
})

db.BDD2_db_bios.aggregate([
    { $unwind: "$awards" }
] )


db.BDD2_db_bios.find()

db.BDD2_db_bios.aggregate([
    { $unwind: "$awards" },
    { $project: { "awards.award" : 1, "awards.year": 1, "name.first": 1, "name.last": 1} },
    { $sort: { "awards.year" : 1 } }
] )


db.BDD2_db_bios.aggregate( [ {
    $project: {
         _id: 0,
         "Full Name": {
                $concat: [
                    "$name.first",
                    " ",
                    "$name.last"
                ]
         },
        age: {
            $round: [{
                     $divide: [{$subtract: [ new Date(), "$birth" ] },
                    (365 * 24*60*60*1000)]
            }
            ]
        },
     }
} ] )

db.BDD2_db_bios.aggregate([
        {
        $project : {
            "Idiomas de programación": "$contribs"
        }
    },
    {
      $unwind : "$Idiomas de programación"
    },
    {
        $group: {
            _id: "$Idiomas de programación"
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
]);


db.BDD2_db_bios.aggregate([
    {
        $project : {
            _id: 0,
            "Nombre": {
                $concat: [
                    "$name.first",
                    " ",
                    "$name.last"
                ]
            },
            "Edad": {
                $ifNull: [
                    {
                        $round: [
                            {
                                $divide: [
                                    {
                                        $subtract: [
                                            "$death",
                                            "$birth"
                                        ]
                                    },
                                    31536000000
                                ]
                            },
                            0
                        ]
                    },
                    //---------
                    {
                        $round: [
                            {
                                $divide: [
                                    {
                                        $subtract: [
                                            new Date(),
                                            "$birth"
                                        ]
                                    },
                                    31536000000
                                ]
                            },
                            0
                        ]
                    }
                ]
            }
        }
    }
]);