import { compareSync, hashSync } from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Account, Admin, Fixture, Team } from './models';

export class AccountService {
    static async register(payload) {
        const account = await Account.create({
            email: payload.email,
            password: hashSync(payload.password, 10),
            firstname: payload.firstname,
            lastname: payload.lastname,
            address: payload.address
        });

        return account
    }

    static async login(payload) {
        let account = await Account.findOne(
            {
                email: payload.email,
            },
            ["password", "email", "firstname", "lastname", "address"]
        );
        if (!account || !compareSync(payload.password, account.password)) {
            return { message: "invalid credentials" }
        }

        return {
            token: jwt.sign({ id: account._id.toString(), admin: false }, "sfdfgfhgsa"),
            data: account
        };
    }

}

export class AdminService {
    static async register(payload) {
        const admin = await Admin.create({
            email: payload.email,
            password: hashSync(payload.password, 10),
            firstname: payload.firstname,
            lastname: payload.lastname,
            address: payload.address
        });

        return admin
    }

    static async login(payload) {
        let admin = await Admin.findOne(
            {
                email: payload.email,
            },
            ["password", "email", "firstname", "lastname", "address"]
        );
        if (!admin || !compareSync(payload.password, admin.password)) {
            return { message: "invalid credentials" }
        }

        return {
            token: jwt.sign({ id: admin._id.toString(), admin: false }, "dfghgfgdfsas"),
            data: admin
        };
    }

}

export class TeamService {
    static async createTeam(payload) {
        return (await Team.create(payload)).toJSON();
    }

    static async findAllTeams() {
        return await Team.find();
    }

    static async findTeam(id: string) {
        return await Team.findById(id);
    }

    static async updateTeam(id: string, payload) {
        await Team.updateOne({_id:id}, payload);
        return await Team.findById(id)
    }

    static async delete(id: string) {
        let team = await Team.findById(id);
        const result = await Team.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }

    static async search(text: string) {
        const team = await Team.findOne({ $or: [{ name: text }, { coach: text }, { code_name: text }, { stadium: text }] });
        if (team) {
            const [pendingFixtures, completedFixtures] = await Promise.all([
                Fixture.find({ status: "pending", $or: [{ home: team.id }, { away: team.id }] }),
                Fixture.find({ status: "completed", $or: [{ home: team.id }, { away: team.id }] })
            ])

            return {
                team,
                pendingFixtures,
                completedFixtures
            }
        }
        return {}
    }
}

export class FixtureService {

    static async createFixture(payload) {

        const [home, away] = await Promise.all([
            Team.findById(payload.home),
            Team.findById(payload.away)
        ])

        const fixture = await Fixture.create({
            home: payload.home,
            away: payload.away,
            venue: home?.stadium,
            time: payload.time
        });
        return { ...fixture.toJSON(), home, away };
    }

    static async getAllFixtures(query?) {
        let fixtures = await Fixture.find(
            {
                ...query,
            }
        );
        const parsedfixtures = await Promise.all(fixtures.map(async (fixture) => {
            const [home, away] = await Promise.all([
                Team.findById(fixture.home),
                Team.findById(fixture.away)
            ])
            return { ...fixture.toJSON(), home, away };
        }))
        return parsedfixtures
    }

    static async getFixture(id: string) {
        const fixture = await Fixture.findById(id);
        if (!fixture) {
            return {}
        }
        const [home, away] = await Promise.all([
            Team.findById(fixture.home),
            Team.findById(fixture.away)
        ])
        return { ...fixture.toJSON(), home, away };
    }

    static async editFixture(id: string, payload) {
        let fixture = await Fixture.findOne({ _id: id });
        let home
        if (payload.home) {
            home = await Team.findById(payload.home)
        }

        await Fixture.updateOne(
            { _id: id },
            {
                home: payload.home,
                away: payload.away,
                time: payload.time,
                score: payload.score,
                venue: home?.stadium || fixture?.venue
            }
        );
        fixture = await Fixture.findOne({ _id: id });
        const [homeTeam, away] = await Promise.all([
            Team.findById(fixture?.home),
            Team.findById(fixture?.away)
        ])
        return { ...fixture?.toJSON(), home: homeTeam, away };
    }

    static async deleteFixture(id: string) {
        let fixture = await Fixture.findById(id);
        if (!fixture) {
            return { message: "fixture doesn't exist, Please selecta a valid fixture" };
        }

        const result = await Fixture.deleteOne({ _id: id })
        return result.deletedCount === 1;
    }

    static async link(id: string) {
        const fixture = await Fixture.findOne({ link: id });
        return fixture
    }

}