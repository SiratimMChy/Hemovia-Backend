const express = require('express');
const router = express.Router();
const { centersCollection } = require('../config/db');

        router.get('/centers', async (req, res) => {
            const division = req.query.division;
            const search = req.query.search;
            const query = {};

            if (division && division !== 'All') {
                query.division = division;
            }
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { district: { $regex: search, $options: 'i' } },
                    { address: { $regex: search, $options: 'i' } }
                ];
            }

            const result = await centersCollection
                .find(query)
                .toArray();
            const totalCenters = await centersCollection.countDocuments(query);
            res.send({ totalCenters, centers: result });
        });

        router.get('/centers/featured/list', async (req, res) => {
            const result = await centersCollection
                .find({ featured: true })
                .limit(8)
                .toArray();
            res.send(result);
        });

        router.get('/centers/stats/summary', async (req, res) => {
            try {
                const totalCenters = await centersCollection.countDocuments();
                const divisions = await centersCollection.distinct('division');
                const districts = await centersCollection.distinct('district');
                const verified = await centersCollection.countDocuments({ verified: true });

                res.send({
                    totalCenters,
                    totalDivisions: divisions.length,
                    totalDistricts: districts.length,
                    verifiedCenters: verified
                });
            } catch (error) {
                console.error('Stats fetch error:', error);
                res.status(500).send({ message: 'Failed to load center stats' });
            }
        });

        router.get('/centers/:id', async (req, res) => {
            const id = req.params.id;
            const query = { id: parseInt(id) };
            const result = await centersCollection.findOne(query);

            if (!result) {
                return res.status(404).send({ message: 'Center not found' });
            }

            res.send(result);
        });

module.exports = router;
