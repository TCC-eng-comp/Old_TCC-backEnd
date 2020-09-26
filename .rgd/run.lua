-- Version 1.4.1

function executeWithStatus(filename, args, env)
    status = run(filename, args, env)
    setStatus(status)
    return status != 0
end

function runScript()
    if branch == "development" then
        if executeWithStatus("npm", "--no-color install", "") then return end
        if executeWithStatus("rm", "-rfv ./build/", "") then return end
        if executeWithStatus("npm", "--no-color run build", "") then return end
        if executeWithStatus("npm", "--no-color run knex:migrate", "CONFIGPATH=/home/rgd/deploy/dev/.config/server.json") then return end
        if executeWithStatus("npm", "--no-color run knex:seed", "CONFIGPATH=/home/rgd/deploy/dev/.config/server.json") then return end
        runWD("pm2", "stop backend-dev", "/home/rgd/deploy/dev/backend", "")
        if executeWithStatus("rm", "-rfv /home/rgd/deploy/dev/backend/", "") then return end
        if executeWithStatus("cp", "-rv ./build/ /home/rgd/deploy/dev/backend/", "") then return end
        if executeWithStatus("ln", "-s " .. repoDirectory .. "/node_modules /home/rgd/deploy/dev/backend/node_modules", "") then return end
        runWD("pm2", "start ./bundle.js --name backend-dev -- --config-/home/rgd/deploy/dev/.config/server.json", "/home/rgd/deploy/dev/backend", "")
    elseif branch == "master" then
        if executeWithStatus("npm", "--no-color install", "") then return end
        if executeWithStatus("rm", "-rfv ./build/", "") then return end
        if executeWithStatus("npm", "--no-color run build", "") then return end
        if executeWithStatus("npm", "--no-color run knex:migrate", "CONFIGPATH=/home/rgd/deploy/dist/.config/server.json") then return end
        if executeWithStatus("npm", "--no-color run knex:seed", "CONFIGPATH=/home/rgd/deploy/dist/.config/server.json") then return end
        runWD("pm2", "stop backend-dist", "/home/rgd/deploy/dist/backend", "")
        if executeWithStatus("rm", "-rfv /home/rgd/deploy/dist/backend/", "") then return end
        if executeWithStatus("cp", "-rv ./build/ /home/rgd/deploy/dist/backend/", "") then return end
        if executeWithStatus("ln", "-s " .. repoDirectory .. "/node_modules /home/rgd/deploy/dist/backend/node_modules", "") then return end
        runWD("pm2", "start ./bundle.js --name backend-dist -- --config-/home/rgd/deploy/dist/.config/server.json", "/home/rgd/deploy/dist/backend", "")
    end
end

runScript()